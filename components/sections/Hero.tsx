"use client";

import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";

import { BrandButton } from "@/components/ui/brand-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HERO_MEDIA, CONTACT_SECTION_HREF, HISTORIA_SECTION_HREF, SITE } from "@/lib/constants";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { cn, scrollToContactForm, scrollToSection } from "@/lib/utils";

const DESKTOP_QUERY = "(min-width: 768px)";
const PRIMEIRA_INTERACAO = ["pointerdown", "touchstart", "scroll", "keydown"] as const;
const TOQUE = ["touchend", "click"] as const;
// Deslocamento máximo do fundo seguindo o mouse (px); a camada tem sangria maior que isso para nunca mostrar borda.
const PROFUNDIDADE_MOUSE = 12;
const NEXT_SECTION_HREF = "#eqi-stats";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
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

  // Profundidade: o fundo rola mais devagar que a página e o texto sobe e some ao sair da tela.
  const reduzirMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const fundoY = useTransform(scrollYProgress, [0, 1], reduzirMovimento ? ["0%", "0%"] : ["0%", "18%"]);
  const fundoEscala = useTransform(scrollYProgress, [0, 1], reduzirMovimento ? [1, 1] : [1, 1.08]);
  const conteudoY = useTransform(scrollYProgress, [0, 1], reduzirMovimento ? ["0%", "0%"] : ["0%", "-8%"]);
  // Intervalo inteiro [0, 1]: o Framer acelera isso com ViewTimeline nativo, e um intervalo parcial voltava a subir depois do fim.
  const conteudoOpacidade = useTransform(scrollYProgress, [0, 1], reduzirMovimento ? [1, 1] : [1, 0]);

  // Com mouse, o fundo acompanha o cursor de leve (só ponteiro fino e sem "reduzir movimento").
  const mouseLigado = useFinePointer();
  const mouseX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const moverFundo = (event: PointerEvent<HTMLElement>) => {
    if (!mouseLigado || event.pointerType !== "mouse") return;
    const area = event.currentTarget.getBoundingClientRect();
    mouseX.set(-((event.clientX - area.left) / area.width - 0.5) * 2 * PROFUNDIDADE_MOUSE);
    mouseY.set(-((event.clientY - area.top) / area.height - 0.5) * 2 * PROFUNDIDADE_MOUSE);
  };
  const soltarFundo = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      onPointerMove={moverFundo}
      onPointerLeave={soltarFundo}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-libertad-green-deep pt-[var(--header-height)]"
    >
      <m.div className="absolute inset-0" style={{ y: fundoY, scale: fundoEscala }} aria-hidden>
        <m.div className="absolute -inset-4" style={{ x: mouseX, y: mouseY }}>
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
        </m.div>
      </m.div>
      <div className="absolute inset-0 bg-libertad-green/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-libertad-green-deep/70 via-transparent to-libertad-green/35" />

      {/* Brilho dourado lento atrás do título */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 size-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--libertad-gold)_16%,transparent),transparent_65%)]"
      />

      {/* Entrada em CSS: o texto aparece no primeiro quadro, sem esperar o JavaScript (é o maior elemento da tela). */}
      <m.div
        style={{ y: conteudoY, opacity: conteudoOpacidade }}
        className="relative z-10 mx-auto max-w-[var(--hero-content-max)] px-[var(--container-px)] py-16 sm:py-24 lg:py-28"
      >
        <div className="hero-enter text-center">
          <Eyebrow variant="pill" tone="dark">
            {SITE.credential}
          </Eyebrow>
        </div>

        <h1
          className="hero-enter font-heading mt-[var(--stack-lg)] text-center text-[length:var(--text-display-hero)] font-semibold leading-[var(--leading-tight)] tracking-tight text-white text-balance"
          style={{ animationDelay: "0.08s" }}
        >
          Grandes patrimônios exigem decisões à altura.
        </h1>

        <p
          className="hero-enter type-subtitle mx-auto mt-[var(--stack-md)] max-w-[var(--hero-content-max)] text-center text-white/78 text-balance sm:mt-[var(--stack-lg)]"
          style={{ animationDelay: "0.16s" }}
        >
          A Libertad Capital, escritório credenciado à EQI Investimentos, atende investidores que buscam
          atendimento personalizado e acesso a diferentes oportunidades de investimento disponíveis por meio da
          plataforma EQI.
        </p>

        <div
          className="hero-enter mt-[var(--stack-xl)] flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4"
          style={{ animationDelay: "0.24s" }}
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
        </div>
      </m.div>

      {/* Indicador de rolagem: contorno de mouse com um ponto dourado descendo; leva à próxima seção. */}
      <a
        href={NEXT_SECTION_HREF}
        aria-label="Rolar para o conteúdo"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection(NEXT_SECTION_HREF);
        }}
        className="hero-enter absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 rounded-full p-2 text-white/45 transition-colors hover:text-libertad-gold focus-visible:outline-libertad-gold sm:block"
        style={{ animationDelay: "0.6s" }}
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-current pt-2">
          <span className="hero-scroll-dot size-1.5 rounded-full bg-libertad-gold" />
        </span>
      </a>
    </section>
  );
}
