"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useLang } from "./lang";

type Kind = "problem" | "idea" | "other";
type Status = "idle" | "sending" | "sent" | "error";

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

const COPY = {
  en: {
    title: "Contact us",
    intro: "Tell us what happened or what you would like to see. We read every message.",
    kinds: { problem: "A problem", idea: "A suggestion", other: "Something else" },
    system: "Operating system",
    systemOther: "Other",
    systemDetail: "Version or distribution",
    systemDetailHint: "e.g. 23H2, Ubuntu 24.04, Sonoma",
    version: "OpenController version",
    versionHint: "Shown at the top of its window, e.g. 0.6.0",
    controller: "Controller",
    controllerHint: "The exact model, e.g. 8BitDo Ultimate 2 Wireless",
    connection: "Connected by",
    connections: ["Cable", "Bluetooth", "Its receiver", "Not sure"],
    message: { problem: "What happened?", idea: "Your suggestion", other: "Your message" },
    messageHint: {
      problem: "The more detail, the better: what you did, what you expected and what happened instead. If there was an error message, copy it here.",
      idea: "What would you like OpenController to do, and in which situation would it help?",
      other: "Write as much as you need.",
    },
    email: "Your email",
    emailTip: "Fill it in if you would like an answer. It is only used to reply to you.",
    optional: "optional",
    send: "Send",
    sending: "Sending…",
    close: "Close",
    sentTitle: "Message sent. Thank you!",
    sentBody: "If you left your email, the answer goes there.",
    errors: {
      message: "Write a little more about it, at least a sentence.",
      email: "That email doesn't look right.",
      rate: "Too many messages in a short time. Try again in an hour.",
      other: "The message could not be sent right now. Try again in a moment, or open an issue on GitHub.",
    },
  },
  pt: {
    title: "Fale conosco",
    intro: "Conte o que aconteceu ou o que você gostaria de ver. Todas as mensagens são lidas.",
    kinds: { problem: "Um problema", idea: "Uma sugestão", other: "Outro assunto" },
    system: "Sistema operacional",
    systemOther: "Outro",
    systemDetail: "Versão ou distribuição",
    systemDetailHint: "ex.: 23H2, Ubuntu 24.04, Sonoma",
    version: "Versão do OpenController",
    versionHint: "Aparece no topo da janela, ex.: 0.6.0",
    controller: "Controle",
    controllerHint: "O modelo exato, ex.: 8BitDo Ultimate 2 Wireless",
    connection: "Conectado por",
    connections: ["Cabo", "Bluetooth", "Receptor", "Não sei"],
    message: { problem: "O que aconteceu?", idea: "Sua sugestão", other: "Sua mensagem" },
    messageHint: {
      problem: "Quanto mais detalhe, melhor: o que você fez, o que esperava e o que aconteceu. Se apareceu alguma mensagem de erro, copie aqui.",
      idea: "O que você gostaria que o OpenController fizesse, e em que situação isso ajudaria?",
      other: "Escreva o quanto precisar.",
    },
    email: "Seu email",
    emailTip: "Preencha se quiser receber uma resposta. Ele só é usado para responder você.",
    optional: "opcional",
    send: "Enviar",
    sending: "Enviando…",
    close: "Fechar",
    sentTitle: "Mensagem enviada. Obrigado!",
    sentBody: "Se você deixou seu email, a resposta chega por lá.",
    errors: {
      message: "Escreva um pouco mais, pelo menos uma frase.",
      email: "Esse email não parece certo.",
      rate: "Muitas mensagens em pouco tempo. Tente de novo daqui a uma hora.",
      other: "Não deu para enviar agora. Tente de novo em instantes, ou abra uma issue no GitHub.",
    },
  },
};

const FIELD =
  "mt-1.5 block w-full rounded-[10px] border border-line-strong bg-white/[0.02] px-3 text-[14.5px] text-fg outline-none transition-colors placeholder:text-faint focus:border-accent";

function Field({ label, hint, children }: { label: ReactNode; hint?: ReactNode; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[13.5px] font-medium text-fg">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-[12.5px] leading-snug text-faint">{hint}</span> : null}
    </label>
  );
}

export function ContactDialog({ version }: { version: string | null }) {
  const lang = useLang();
  const c = COPY[lang];
  const dialog = useRef<HTMLDialogElement>(null);
  const opened = useRef(0);
  const [kind, setKind] = useState<Kind>("problem");
  const [system, setSystem] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const open = (e: Event) => {
      setKind((e as CustomEvent<Kind>).detail ?? "problem");
      setSystem((s) => s || (DEFAULT_SYSTEM[document.documentElement.getAttribute("data-os") ?? ""] ?? ""));
      setStatus("idle");
      setError(null);
      opened.current = Date.now();
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN, open);
    return () => window.removeEventListener(OPEN, open);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();
    const system = get("system") === "other" ? get("systemDetail") : [get("system"), get("systemDetail")].filter(Boolean).join(" ");
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          system,
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
        setStatus("sent");
        return;
      }
      const { error: code } = (await res.json().catch(() => ({}))) as { error?: string };
      setError(code === "message" || code === "email" || code === "rate" ? c.errors[code] : c.errors.other);
    } catch {
      setError(c.errors.other);
    }
    setStatus("error");
  }

  const problem = kind === "problem";

  return (
    <dialog
      ref={dialog}
      aria-labelledby="contact-dialog-title"
      className="contact-dialog m-auto w-[min(40rem,calc(100vw-2rem))] rounded-2xl border border-line-strong bg-panel p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="contact-dialog-title" className="text-[24px] font-semibold tracking-tight">
            {c.title}
          </h2>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="-mr-2 -mt-1 rounded-lg px-2 py-1 text-[20px] leading-none text-faint transition-colors hover:text-fg"
            aria-label={c.close}
          >
            ×
          </button>
        </div>

        {status === "sent" ? (
          <div className="py-8" role="status">
            <p className="text-[19px] font-semibold">{c.sentTitle}</p>
            <p className="mt-2 text-[15px] text-muted">{c.sentBody}</p>
            <button type="button" className="btn btn-ghost mt-8 h-11 px-5 text-[14px]" onClick={() => dialog.current?.close()}>
              {c.close}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-2" noValidate>
            <p className="text-[14.5px] leading-relaxed text-muted">{c.intro}</p>

            <div className="seg mt-5" role="group" aria-label={c.title}>
              {(Object.keys(c.kinds) as Kind[]).map((k) => (
                <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
                  {c.kinds[k]}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-5">
              {problem ? (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={c.system}>
                      <select name="system" value={system} onChange={(e) => setSystem(e.target.value)} className={`${FIELD} h-11`}>
                        <option value="">—</option>
                        {SYSTEMS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                        <option value="other">{c.systemOther}</option>
                      </select>
                    </Field>
                    <Field label={c.systemDetail}>
                      <input name="systemDetail" className={`${FIELD} h-11`} placeholder={c.systemDetailHint} maxLength={60} />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={c.controller} hint={c.controllerHint}>
                      <input name="controller" className={`${FIELD} h-11`} maxLength={120} />
                    </Field>
                    <Field label={c.connection}>
                      <select name="connection" defaultValue="" className={`${FIELD} h-11`}>
                        <option value="">—</option>
                        {c.connections.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label={c.version} hint={c.versionHint}>
                    <input name="version" className={`${FIELD} h-11 sm:max-w-[14rem]`} placeholder={version ?? ""} maxLength={30} />
                  </Field>
                </>
              ) : null}

              <Field label={c.message[kind]} hint={c.messageHint[kind]}>
                <textarea name="message" required minLength={10} maxLength={5000} rows={problem ? 6 : 7} className={`${FIELD} resize-y py-2.5 leading-relaxed`} />
              </Field>

              <div>
                <div className="flex items-center gap-1.5">
                  <label htmlFor="contact-email" className="text-[13.5px] font-medium text-fg">
                    {c.email} <span className="font-normal text-faint">({c.optional})</span>
                  </label>
                  <span className="group relative inline-flex">
                    <button
                      type="button"
                      aria-label={c.emailTip}
                      aria-describedby="contact-email-tip"
                      className="grid size-[17px] place-items-center rounded-full border border-line-strong font-mono text-[10.5px] leading-none text-faint transition-colors hover:border-fg hover:text-fg focus-visible:border-accent focus-visible:text-fg"
                    >
                      i
                    </button>
                    <span
                      id="contact-email-tip"
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-60 -translate-x-1/2 rounded-lg border border-line-strong bg-panel-2 px-3 py-2 text-[12.5px] leading-snug text-muted opacity-0 shadow-xl transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
                    >
                      {c.emailTip}
                    </span>
                  </span>
                </div>
                <input id="contact-email" name="email" type="email" autoComplete="email" className={`${FIELD} h-11`} maxLength={200} />
              </div>

              <input name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />
            </div>

            {error ? (
              <p className="mt-5 text-[14px] text-[#ff9b8a]" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button type="submit" className="btn btn-primary h-11 px-6 text-[14.5px]" disabled={status === "sending"}>
                {status === "sending" ? c.sending : c.send}
              </button>
              <button type="button" className="btn btn-ghost h-11 px-5 text-[14px]" onClick={() => dialog.current?.close()}>
                {c.close}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
