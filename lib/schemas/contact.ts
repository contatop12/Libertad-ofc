import { z } from "zod";

import { OBJETIVO_OPTIONS, PATRIMONIO_OPTIONS } from "@/lib/constants";

const patrimonioValues = PATRIMONIO_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];
const objetivoValues = OBJETIVO_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];

export const contactSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo"),
  email: z.string().email("Informe um e-mail válido"),
  whatsapp: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Informe um WhatsApp válido com DDD"),
  patrimonio: z.enum(patrimonioValues, {
    message: "Selecione seu patrimônio",
  }),
  objetivo: z.enum(objetivoValues, {
    message: "Selecione seu objetivo",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
