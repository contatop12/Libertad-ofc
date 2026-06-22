import { z } from "zod";

import { DDI_OPTIONS, OBJETIVO_OPTIONS, PATRIMONIO_OPTIONS } from "@/lib/constants";

const patrimonioValues = PATRIMONIO_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];
const objetivoValues = OBJETIVO_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];
const ddiValues = DDI_OPTIONS.map((o) => o.value) as [string, ...string[]];

const brazilPhoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

export const contactSchema = z
  .object({
    nome: z.string().min(2, "Informe seu nome completo"),
    email: z.string().email("Informe um e-mail válido"),
    ddi: z.enum(ddiValues, {
      message: "Selecione o DDI",
    }),
    whatsapp: z.string().min(1, "Informe seu WhatsApp"),
    patrimonio: z.enum(patrimonioValues, {
      message: "Selecione seu patrimônio",
    }),
    objetivo: z.enum(objetivoValues, {
      message: "Selecione seu objetivo",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.ddi === "55") {
      if (!brazilPhoneRegex.test(data.whatsapp)) {
        ctx.addIssue({
          code: "custom",
          message: "Informe um WhatsApp válido com DDD",
          path: ["whatsapp"],
        });
      }
      return;
    }

    const digits = data.whatsapp.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      ctx.addIssue({
        code: "custom",
        message: "Informe um número de telefone válido",
        path: ["whatsapp"],
      });
    }
  });

export type ContactFormData = z.infer<typeof contactSchema>;
