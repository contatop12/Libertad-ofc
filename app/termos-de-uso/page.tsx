import Link from "next/link";

import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export default function TermosDeUsoPage() {
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
          <h1 className="type-title-lg mt-6 text-libertad-text-dark">Termos de Uso</h1>
          <div className="mt-8 flex max-w-3xl flex-col gap-4 type-body text-libertad-text-medium">
            <p>
              Ao acessar o site da {SITE.name}, você concorda com estes termos. O conteúdo disponível
              tem caráter informativo e não constitui recomendação personalizada de investimento.
            </p>
            <p>
              As informações sobre produtos, rentabilidade e estratégias podem ser alteradas sem aviso
              prévio. Decisões de investimento devem considerar seu perfil, objetivos e análise
              profissional individualizada.
            </p>
            <p>
              A {SITE.name} atua como escritório credenciado à EQI Investimentos. Serviços financeiros
              seguem as normas aplicáveis ao mercado de capitais e às instituições parceiras.
            </p>
            <p>
              O uso indevido deste site, incluindo tentativas de acesso não autorizado ou uso de
              conteúdo sem permissão, é proibido. Dúvidas podem ser encaminhadas para{" "}
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
