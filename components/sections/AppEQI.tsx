import Image from "next/image";

import { Section } from "@/components/ui/section";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { APP_SHOWCASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-5 shrink-0", className)}
      aria-hidden
      fill="currentColor"
    >
      <path d="M3.6 1.8c-.3.2-.6.6-.6 1.1v18.2c0 .5.3.9.6 1.1l.1.1 10.2-10.2v-.2L3.7 1.7l-.1.1z" />
      <path d="M16.2 13.8 5.5 24l.1.1c.4.3 1 .3 1.7-.1l11.5-6.6-1.6-3.6z" />
      <path d="M21.8 10.6 18.4 8.6l-2.2 2.2 2.2 2.2 3.4-2c.6-.4.6-.9 0-1.4z" />
      <path d="M5.5 0 16.2 10.2l2.2-2.2L7.2.1C6.5-.3 5.9-.3 5.5 0z" />
    </svg>
  );
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-5 shrink-0", className)}
      aria-hidden
      fill="currentColor"
    >
      <path d="M18.7 12.6c-.1-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.5-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.2 1-4.1 2.5-1.7 3-.5 7.5 1.3 9.9.8 1.2 1.8 2.5 3.1 2.4 1.2-.1 1.7-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.2 2.9-2.4.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.6-1-2.6-3.9zM15.6 4.3c.7-.9 1.2-2.1 1.1-3.3-1.1.1-2.3.7-3.1 1.5-.7.7-1.3 1.9-1.1 3 1.2.1 2.4-.6 3.1-1.2z" />
    </svg>
  );
}

type StoreLinkProps = {
  href: string;
  store: "google" | "apple";
};

function StoreLink({ href, store }: StoreLinkProps) {
  const isGoogle = store === "google";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex w-full max-w-[11.5rem] items-center gap-3 rounded-[var(--radius-md)]",
        "border border-[rgb(0_0_0/0.1)] bg-white px-4 py-2.5",
        "text-[length:var(--text-body-sm)] font-medium text-libertad-text-dark",
        "transition-[border-color,box-shadow] duration-200",
        "hover:border-[rgb(0_0_0/0.18)] hover:shadow-[var(--shadow-sm)]",
      )}
    >
      {isGoogle ? <GooglePlayIcon /> : <AppStoreIcon />}
      {isGoogle ? "Google Play" : "App Store"}
    </a>
  );
}

export function AppEQI() {
  return (
    <Section tone="light" containerClassName="max-w-[1300px]">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-14">
        {APP_SHOWCASE.map((app, index) => (
          <SectionReveal key={app.title} delay={index * 0.1}>
            <article className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex w-full flex-1 flex-col items-start sm:max-w-[18rem] lg:max-w-[20rem]">
                <p className="text-[length:var(--text-body-sm)] font-medium text-libertad-green-mid">
                  {app.eyebrow}
                </p>
                <h3 className="font-heading mt-2 text-[length:var(--text-display-lg)] font-bold leading-[var(--leading-snug)] tracking-tight text-libertad-green text-balance">
                  {app.title}
                </h3>
                <p className="type-caption mt-3 text-libertad-text-muted">{app.description}</p>

                <div className="mt-6 flex w-full flex-col gap-2.5">
                  <StoreLink href={app.playStoreUrl} store="google" />
                  <StoreLink href={app.appStoreUrl} store="apple" />
                </div>
              </div>

              <div className="flex w-full shrink-0 justify-center sm:w-auto sm:justify-end">
                <Image
                  src={app.image}
                  alt={app.imageAlt}
                  width={280}
                  height={560}
                  className="h-auto w-full max-w-[160px] object-contain sm:max-w-[175px] lg:max-w-[195px]"
                />
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </Section>
  );
}
