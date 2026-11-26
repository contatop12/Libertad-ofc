"use client";

import { m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BrandButton } from "@/components/ui/brand-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HERO_MEDIA, CONTACT_SECTION_HREF, HISTORIA_SECTION_HREF, SITE } from "@/lib/constants";
import { cn, scrollToContactForm, scrollToSection } from "@/lib/utils";

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const DESKTOP_QUERY = "(min-width: 768px)";
const PRIMEIRA_INTERACAO = ["pointerdown", "touchstart", "scroll", "keydown"] as const;
const TOQUE = ["touchend", "click"] as const;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoTocando, setVideoTocando] = useState(false);

  // Desktop: o vídeo carrega logo após a hidratação. Mobile: só depois da primeira interação (até lá fica a imagem estática).
  useEffect(() => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setVideoSrc(HERO_MEDIA.videoDesktop);
      return;
    }
    const remover = () => PRIMEIRA_INTERACAO.forEach((evento) => window.removeEventListener(evento, ativar));
    const ativar = () => {
      setVideoSrc(HERO_MEDIA.videoMobile);
      remover();
    };
    PRIMEIRA_INTERACAO.forEach((evento) => window.addEventListener(evento, ativar, { passive: true }));
    return remover;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const tocar = () => {
      video.play().catch(() => {});
    };
    tocar();
    // iOS em modo de pouca energia só libera o play dentro de um toque: tenta de novo a cada toque até o vídeo começar
    const remover = () => TOQUE.forEach((evento) => window.removeEventListener(evento, tocar));
    TOQUE.forEach((evento) => window.addEventListener(evento, tocar, { passive: true }));
    video.addEventListener("playing", remover, { once: true });
    return () => {
      remover();
      video.removeEventListener("playing", remover);
    };
  }, [videoSrc]);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-libertad-green-deep pt-[var(--header-height)]"
    >
      <picture>
        <source media={DESKTOP_QUERY} srcSet={HERO_MEDIA.imageDesktop} type="image/webp" />
        <img
          src={HERO_MEDIA.imageMobile}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </picture>
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700",
            videoTocando ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden
          onPlaying={() => setVideoTocando(true)}
        />
      ) : null}
      <div className="absolute inset-0 bg-libertad-green/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-libertad-green-deep/70 via-transparent to-libertad-green/35" />

      <div className="relative z-10 mx-auto max-w-[var(--hero-content-max)] px-[var(--container-px)] py-16 sm:py-24 lg:py-28">
        <m.div initial="hidden" animate="visible" variants={fadeUp(0)} className="text-center">
          <Eyebrow variant="pill" tone="dark">
            {SITE.credential}
          </Eyebrow>
        </m.div>

        <m.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.12)}
          className="font-heading mt-[var(--stack-lg)] text-center text-[length:var(--text-display-hero)] font-semibold leading-[var(--leading-tight)] tracking-tight text-white text-balance"
        >
          Grandes patrimônios exigem decisões à altura.
        </m.h1>

        <m.p
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.24)}
          className="type-subtitle mx-auto mt-[var(--stack-md)] max-w-[var(--hero-content-max)] text-center text-white/78 text-balance sm:mt-[var(--stack-lg)]"
        >
          A Libertad Capital, escritório credenciado à EQI Investimentos, atende investidores que buscam
          atendimento personalizado e acesso a diferentes oportunidades de investimento disponíveis por meio da
          plataforma EQI.
        </m.p>

        <m.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.36)}
          className="mt-[var(--stack-xl)] flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <BrandButton
            href={CONTACT_SECTION_HREF}
            onClick={(event) => {
              event.preventDefault();
              scrollToContactForm();
            }}
            variant="gold"
            size="lg"
            fullWidth
            className="sm:w-auto sm:min-w-[16rem]"
          >
            Agendar Reunião Estratégica
          </BrandButton>
          <BrandButton
            href={HISTORIA_SECTION_HREF}
            variant="ghost-white"
            size="lg"
            fullWidth
            className="sm:w-auto sm:min-w-[16rem]"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(HISTORIA_SECTION_HREF);
            }}
          >
            Conheça Nossa História
          </BrandButton>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <ChevronDown className="size-7 animate-bounce text-white/40" />
      </m.div>
    </section>
  );
}
