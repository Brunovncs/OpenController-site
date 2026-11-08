import { redirect } from "next/navigation";
import { PasskeyLogin } from "@/components/admin/Passkey";
import { credentials, hasSession } from "@/lib/admin";
import { dbReady } from "@/lib/db";

export default async function AdminLogin() {
  if (!dbReady()) return <p className="p-8 text-muted">Banco de dados não configurado.</p>;
  if (await hasSession()) redirect("/admin");
  const setup = (await credentials()).length === 0;
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <PasskeyLogin setup={setup} />
    </main>
  );
}
