import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Privacidade | Libertad Capital",
  description:
    "Saiba como a Libertad Capital trata seus dados pessoais, cookies e preferências de navegação em conformidade com a LGPD.",
  alternates: {
    canonical: `${SITE.url}/politica-de-privacidade`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

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

            <h2 className="type-title-sm mt-4 text-libertad-text-dark">Cookies e armazenamento local</h2>
            <p>
              Utilizamos cookies essenciais e armazenamento local (localStorage) para registrar suas
              preferências de consentimento e garantir o funcionamento básico do site. Esses dados não
              identificam você diretamente e não são utilizados para publicidade.
            </p>
            <p>
              Também usamos o Google Analytics, carregado pelo Google Tag Manager, para medir a audiência
              do site: páginas visitadas, origem do acesso e interações. Essa medição usa cookies do Google
              Analytics, gera dados estatísticos e não é utilizada para publicidade.
            </p>
            <p>
              A medição fica ativa desde a primeira visita. Ao clicar em &quot;Aceitar cookies&quot; no aviso,
              você concorda com o uso dessas tecnologias conforme descrito nesta política. Ao clicar em
              &quot;Recusar&quot;, a medição é desligada neste navegador e os cookies do Google Analytics já
              gravados são apagados. Você pode remover as preferências salvas a qualquer momento limpando
              os dados de navegação do seu navegador.
            </p>

            <h2 className="type-title-sm mt-4 text-libertad-text-dark">Seus direitos</h2>
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
