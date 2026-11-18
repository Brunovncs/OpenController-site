"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/arc/button/button";
import { Dialog, DialogClose, DialogContent } from "@/components/arc/dialog/dialog";
import { Input } from "@/components/arc/input/input";
import { Textarea } from "@/components/arc/textarea/textarea";
import { track } from "@/lib/track";
import { useLang, useT } from "./lang";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = { model?: string; email?: string; form?: string };

/** What is known when the dialog opens: what was searched, or what the controller test read. */
export type RequestDetail = { model?: string; ids?: string; browserId?: string; query?: string };

const OPEN = "oc-request";

/** Opens "Ask for this controller" from anywhere on the page. */
export function openRequest(detail: RequestDetail = {}) {
  window.dispatchEvent(new CustomEvent<RequestDetail>(OPEN, { detail }));
}

export function RequestDialog({ appReports }: { appReports: boolean }) {
  const lang = useLang();
  const c = useT().home.request;
  const opened = useRef(0);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<RequestDetail>({});
  const [model, setModel] = useState("");
  // Notes and email survive closing the dialog by a stray click, as it is mounted again on open.
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<RequestDetail>).detail ?? {};
      setDetail(d);
      setModel(d.model ?? "");
      setStatus("idle");
      setErrors({});
      if (!opened.current) opened.current = Date.now();
      setOpen(true);
      track("funnel", "request:open", d.ids ? "test" : d.query ? "search" : "other");
    };
    window.addEventListener(OPEN, onOpen);
    return () => window.removeEventListener(OPEN, onOpen);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();
    if (get("model").length < 2) {
      setErrors({ model: c.errors.model });
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrors({});
    track("funnel", "request:submit");
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "site",
          model: get("model"),
          message: get("message"),
          email: get("email"),
          ids: detail.ids ?? "",
          browserId: detail.browserId ?? "",
          query: detail.query ?? "",
          website: get("website"),
          lang,
          elapsed: Date.now() - opened.current,
        }),
      });
      if (res.ok) {
        opened.current = 0;
        setDraft({});
        setStatus("sent");
        return;
      }
      const { error: code } = (await res.json().catch(() => ({}))) as { error?: string };
      track("funnel", "request:error", code ?? String(res.status));
      setErrors(code === "model" || code === "email" ? { [code]: c.errors[code] } : { form: code === "rate" ? c.errors.rate : c.errors.other });
    } catch {
      track("funnel", "request:error", "network");
      setErrors({ form: c.errors.other });
    }
    setStatus("error");
  }

  const sent = status === "sent";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        title={sent ? c.sentTitle : c.title}
        description={sent ? c.sentBody : c.intro}
        closeLabel={c.close}
        className="w-[min(36rem,calc(100vw-2rem))]!"
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
              if (t.name === "message" || t.name === "email") setDraft((d) => ({ ...d, [t.name]: t.value }));
            }}
            noValidate
            className="grid gap-5"
          >
            <Input
              label={c.model}
              name="model"
              description={c.modelHint}
              error={errors.model}
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              minLength={2}
              maxLength={120}
            />

            {detail.ids || detail.browserId ? (
              <div>
                <span className="text-[14px] font-medium text-fg">{c.ids}</span>
                <p className="mt-2 break-all rounded-[12px] border border-line bg-white/[0.02] px-3 py-2 font-mono text-[12.5px] text-muted">
                  {[detail.ids, detail.browserId].filter(Boolean).join(" · ")}
                </p>
              </div>
            ) : null}

            <Textarea label={c.notes} name="message" description={c.notesHint} defaultValue={draft.message} maxLength={3000} rows={3} />
            <Input label={c.email} name="email" type="email" autoComplete="email" description={c.emailHint} error={errors.email} defaultValue={draft.email} maxLength={200} />
            <input name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />

            {appReports ? <p className="border-l-2 border-accent/60 pl-3 text-[13px] leading-snug text-muted">{c.app}</p> : null}

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
