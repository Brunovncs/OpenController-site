"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useLang } from "./lang";

type Status = "idle" | "sending" | "sent" | "error";

/** What is known when the dialog opens: what was searched, or what the controller test read. */
export type RequestDetail = { model?: string; ids?: string; browserId?: string; query?: string };

const OPEN = "oc-request";

/** Opens "Ask for this controller" from anywhere on the page. */
export function openRequest(detail: RequestDetail = {}) {
  window.dispatchEvent(new CustomEvent<RequestDetail>(OPEN, { detail }));
}

const COPY = {
  en: {
    title: "Ask for a controller",
    intro: "Tell us which controller you would like on the list. Requests for the controllers people use most come first.",
    model: "Brand and model",
    modelHint: "As it is sold, e.g. Redragon Darkflame G820",
    ids: "Read by the controller test",
    notes: "Anything else",
    notesHint: "Where you bought it, how you connect it, what does not work.",
    email: "Your email",
    emailHint: "To tell you when it is added. Only used for that.",
    optional: "optional",
    app: "Already have OpenController? Its window can send the controller's details for you: open the controller, then Information, then Report a problem.",
    send: "Send request",
    sending: "Sending…",
    close: "Close",
    sentTitle: "Request sent. Thank you!",
    sentBody: "If you left your email, you will hear back when it is added.",
    errors: {
      model: "Write the brand and model.",
      email: "That email doesn't look right.",
      rate: "Too many requests in a short time. Try again in an hour.",
      other: "The request could not be sent right now. Try again in a moment.",
    },
  },
  pt: {
    title: "Pedir um controle",
    intro: "Diga qual controle você quer na lista. Os pedidos dos controles mais usados vêm primeiro.",
    model: "Marca e modelo",
    modelHint: "Como ele é vendido, ex.: Redragon Darkflame G820",
    ids: "Lido pelo teste de controle",
    notes: "Algo mais",
    notesHint: "Onde comprou, como conecta, o que não funciona.",
    email: "Seu email",
    emailHint: "Para avisar quando ele entrar. Só é usado para isso.",
    optional: "opcional",
    app: "Já tem o OpenController? A janela dele envia os dados do controle por você: abra o controle, depois Informações, depois Reportar um problema.",
    send: "Enviar pedido",
    sending: "Enviando…",
    close: "Fechar",
    sentTitle: "Pedido enviado. Obrigado!",
    sentBody: "Se você deixou seu email, avisamos quando ele entrar.",
    errors: {
      model: "Escreva a marca e o modelo.",
      email: "Esse email não parece certo.",
      rate: "Muitos pedidos em pouco tempo. Tente de novo daqui a uma hora.",
      other: "Não deu para enviar agora. Tente de novo em instantes.",
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

export function RequestDialog({ appReports }: { appReports: boolean }) {
  const lang = useLang();
  const c = COPY[lang];
  const dialog = useRef<HTMLDialogElement>(null);
  const opened = useRef(0);
  const [detail, setDetail] = useState<RequestDetail>({});
  const [model, setModel] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const open = (e: Event) => {
      const d = (e as CustomEvent<RequestDetail>).detail ?? {};
      setDetail(d);
      setModel(d.model ?? "");
      setStatus("idle");
      setError(null);
      if (!opened.current) opened.current = Date.now();
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN, open);
    return () => window.removeEventListener(OPEN, open);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();
    if (get("model").length < 2) {
      setError(c.errors.model);
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError(null);
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
        setStatus("sent");
        return;
      }
      const { error: code } = (await res.json().catch(() => ({}))) as { error?: string };
      setError(code === "model" || code === "email" || code === "rate" ? c.errors[code] : c.errors.other);
    } catch {
      setError(c.errors.other);
    }
    setStatus("error");
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="request-dialog-title"
      className="contact-dialog m-auto w-[min(36rem,calc(100vw-2rem))] rounded-2xl border border-line-strong bg-panel p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="request-dialog-title" className="text-[24px] font-semibold tracking-tight">
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

            <div className="mt-6 grid gap-5">
              <Field label={c.model} hint={c.modelHint}>
                <input
                  name="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                  minLength={2}
                  maxLength={120}
                  className={`${FIELD} h-11`}
                />
              </Field>

              {detail.ids || detail.browserId ? (
                <div>
                  <span className="text-[13.5px] font-medium text-fg">{c.ids}</span>
                  <p className="mt-1.5 break-all rounded-[10px] border border-line bg-white/[0.02] px-3 py-2 font-mono text-[12.5px] text-muted">
                    {[detail.ids, detail.browserId].filter(Boolean).join(" · ")}
                  </p>
                </div>
              ) : null}

              <Field
                label={
                  <>
                    {c.notes} <span className="font-normal text-faint">({c.optional})</span>
                  </>
                }
                hint={c.notesHint}
              >
                <textarea name="message" maxLength={3000} rows={3} className={`${FIELD} resize-y py-2.5 leading-relaxed`} />
              </Field>

              <Field
                label={
                  <>
                    {c.email} <span className="font-normal text-faint">({c.optional})</span>
                  </>
                }
                hint={c.emailHint}
              >
                <input name="email" type="email" autoComplete="email" className={`${FIELD} h-11`} maxLength={200} />
              </Field>

              <input name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />
            </div>

            {appReports ? <p className="mt-5 border-l-2 border-accent/60 pl-3 text-[13px] leading-snug text-muted">{c.app}</p> : null}

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
