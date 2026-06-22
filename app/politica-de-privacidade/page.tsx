import Link from "next/link";

import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Header />
      <main className="bg-libertad-off-white py-[var(--section-py)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <Link
            href="/"
            className="text-[length:var(--text-body-sm)] font-medium text-libertad-green-mid transition-colors hover:text-libertad-gold"
          >
            ← Voltar ao início
          </Link>
          <h1 className="type-title-lg mt-6 text-libertad-text-dark">Política de Privacidade</h1>
          <div className="mt-8 flex max-w-3xl flex-col gap-4 type-body text-libertad-text-medium">
            <p>
              A {SITE.name} respeita a sua privacidade e trata os dados pessoais em conformidade com a
              Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
            <p>
              Os dados informados neste site — como nome, e-mail, telefone e informações sobre seu
              patrimônio — são utilizados exclusivamente para contato, atendimento e prestação de
              serviços de assessoria de investimentos.
            </p>
            <p>
              Não compartilhamos suas informações com terceiros para fins comerciais. O tratamento pode
              envolver parceiros estritamente necessários à operação, sempre com medidas de segurança
              adequadas.
            </p>
            <p>
              Você pode solicitar acesso, correção ou exclusão dos seus dados pelo e-mail{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-libertad-green-mid hover:text-libertad-gold"
              >
                {SITE.email}
              </a>
              .
            </p>
            <p className="type-caption text-libertad-text-muted">
              Última atualização: {new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
