"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@/components/arc/button/button";
import { Dialog, DialogClose, DialogContent } from "@/components/arc/dialog/dialog";
import { Input } from "@/components/arc/input/input";
import SegmentedControl from "@/components/arc/segmented-control/segmented-control";
import { Select } from "@/components/arc/select/select";
import { Textarea } from "@/components/arc/textarea/textarea";
import { track } from "@/lib/track";
import { useLang, useT } from "./lang";

type Kind = "problem" | "idea" | "other";
type Status = "idle" | "sending" | "sent" | "error";
type Errors = { message?: string; email?: string; form?: string };

const OPEN = "oc-contact";

/** Opens the contact form from anywhere on the page. */
export function openContact(kind: Kind = "problem") {
  window.dispatchEvent(new CustomEvent<Kind>(OPEN, { detail: kind }));
}

export function ContactButton({ kind = "problem", className, children }: { kind?: Kind; className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => openContact(kind)}>
      {children}
    </button>
  );
}

const SYSTEMS = ["Windows 11", "Windows 10", "Linux", "macOS"];
const DEFAULT_SYSTEM: Record<string, string> = { windows: "Windows 11", linux: "Linux", mac: "macOS" };

/** What the e-mail says for each connection, in the order of contactForm.connections, whatever the page's language. */
const CONNECTIONS = ["Cable", "Bluetooth", "Its receiver", "Not sure"];

export function ContactDialog({ version }: { version: string | null }) {
  const lang = useLang();
  const c = useT().home.contactForm;
  const opened = useRef(0);
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<Kind>("problem");
  const [system, setSystem] = useState("");
  const [connection, setConnection] = useState("");
  // What was typed survives closing the dialog by a stray click, as it is mounted again on open.
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const onOpen = (e: Event) => {
      track("funnel", "contact:open", (e as CustomEvent<Kind>).detail ?? "problem");
      setKind((e as CustomEvent<Kind>).detail ?? "problem");
      setSystem((s) => s || (DEFAULT_SYSTEM[document.documentElement.getAttribute("data-os") ?? ""] ?? ""));
      setStatus("idle");
      setErrors({});
      // From the first time it opened: a message typed, closed by a stray click and sent right
      // after reopening is still a person's.
      if (!opened.current) opened.current = Date.now();
      setOpen(true);
    };
    window.addEventListener(OPEN, onOpen);
    return () => window.removeEventListener(OPEN, onOpen);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();
    const os = get("system") === "other" ? get("systemDetail") : [get("system"), get("systemDetail")].filter(Boolean).join(" ");
    setStatus("sending");
    setErrors({});
    track("funnel", "contact:submit", kind);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          system: os,
          version: get("version"),
          controller: get("controller"),
          connection: get("connection"),
          message: get("message"),
          email: get("email"),
          website: get("website"),
          lang,
          elapsed: Date.now() - opened.current,
        }),
      });
      if (res.ok) {
        opened.current = 0;
        setDraft({});
        setConnection("");
        setStatus("sent");
        return;
      }
      const { error: code } = (await res.json().catch(() => ({}))) as { error?: string };
      track("funnel", "contact:error", code ?? String(res.status));
      setErrors(code === "message" || code === "email" ? { [code]: c.errors[code] } : { form: code === "rate" ? c.errors.rate : c.errors.other });
    } catch {
      track("funnel", "contact:error", "network");
      setErrors({ form: c.errors.other });
    }
    setStatus("error");
  }

  const problem = kind === "problem";
  const sent = status === "sent";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        title={sent ? c.sentTitle : c.title}
        description={sent ? c.sentBody : undefined}
        closeLabel={c.close}
        className="w-[min(40rem,calc(100vw-2rem))]!"
      >
        {sent ? (
          <div role="status">
            <DialogClose asChild>
              <Button variant="secondary">{c.close}</Button>
            </DialogClose>
          </div>
        ) : (
          <form
            onSubmit={submit}
            onChange={(e) => {
              const t = e.target as unknown as HTMLInputElement;
              if (t.name) setDraft((d) => ({ ...d, [t.name]: t.value }));
            }}
            noValidate
            className="grid gap-5"
          >
            <SegmentedControl
              label={c.kind}
              value={kind}
              onValueChange={(k) => setKind(k as Kind)}
              options={(Object.keys(c.kinds) as Kind[]).map((k) => ({ value: k, label: c.kinds[k] }))}
            />

            {problem ? (
              <>
                <div className="grid items-start gap-5 sm:grid-cols-2">
                  <Select
                    label={c.system}
                    name="system"
                    value={system}
                    onValueChange={setSystem}
                    placeholder={c.choose}
                    options={[...SYSTEMS.map((s) => ({ value: s, label: s })), { value: "other", label: c.systemOther }]}
                  />
                  <Input label={c.systemDetail} name="systemDetail" defaultValue={draft.systemDetail} placeholder={c.systemDetailHint} maxLength={60} />
                </div>
                <div className="grid items-start gap-5 sm:grid-cols-2">
                  <Input label={c.controller} name="controller" defaultValue={draft.controller} description={c.controllerHint} maxLength={120} />
                  <Select label={c.connection} name="connection" value={connection} onValueChange={setConnection} placeholder={c.choose} options={c.connections.map((s, i) => ({ value: CONNECTIONS[i] ?? s, label: s }))} />
                </div>
                <div className="sm:max-w-[14rem]">
                  <Input label={c.version} name="version" defaultValue={draft.version} description={c.versionHint} placeholder={version ?? ""} maxLength={30} />
                </div>
              </>
            ) : null}

            <Textarea
              label={c.message[kind]}
              name="message"
              defaultValue={draft.message}
              description={c.messageHint[kind]}
              error={errors.message}
              required
              minLength={10}
              maxLength={5000}
              rows={problem ? 6 : 7}
            />
            <Input label={c.email} name="email" defaultValue={draft.email} type="email" autoComplete="email" description={c.emailHint} error={errors.email} maxLength={200} />
            <input name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />

            {errors.form ? (
              <p className="text-[14px] text-[#ff9b8a]" role="alert">
                {errors.form}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button type="submit" loading={status === "sending"} className="[--background:var(--color-accent-ink)] [--foreground:var(--color-accent)]">
                {c.send}
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">{c.close}</Button>
              </DialogClose>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
