"use client";

import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

// Validação com mensagens traduzidas
const formSchema = z.object({
  name: z.string().min(2, { message: "errors.name" }),
  email: z.string().email({ message: "errors.email" }),
  empresa: z.string().min(2, { message: "errors.company" }),
  telefone: z
    .string()
    .min(2, { message: "errors.phone" })
    .refine(
      (val) => !val || /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(val),
      { message: "errors.phone" }
    ),
  assunto: z.string().min(1, { message: "errors.subject" }),
  mensagem: z.string().min(2, { message: "errors.message" }),
});

// 🔹 Componente para traduzir mensagens de erro
const FormErrorMessage = ({ name }: { name: keyof z.infer<typeof formSchema> }) => {
  const t = useTranslations("Form");
  const { formState } = useFormContext<z.infer<typeof formSchema>>();

  const message = formState.errors[name]?.message as string | undefined;
  if (!message) return null;

  return (
    <p className="text-sm font-medium text-red-500">
      {t(message)}
    </p>
  );
};

export const Formulario = () => {
  const t = useTranslations("Form");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      empresa: "",
      telefone: "",
      assunto: "",
      mensagem: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) toast.success(t("success"));
    else if (res.status === 400 || res.status === 500)
      toast.error(t("error", { status: res.statusText }));
    else toast.error(t("validation"));
  }

  // Função para formatar telefone
  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return `${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative group flex flex-col gap-6 md:p-10 p-7 rounded-[20px] border border-transparent
            bg-gradient-to-br from-[#1b1b1b] via-[#121212] to-[#0a0a0a]
            shadow-[0_0_15px_rgba(227,35,32,0.15)] overflow-hidden"
        >
          <h2>
            <span>🛡️</span> {t("heading")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("placeholders.name")} {...field} />
                  </FormControl>
                  <FormErrorMessage name="name" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("placeholders.email")}
                      {...field}
                    />
                  </FormControl>
                  <FormErrorMessage name="email" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Empresa */}
            <FormField
              control={form.control}
              name="empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.company")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("placeholders.company")} {...field} />
                  </FormControl>
                  <FormErrorMessage name="empresa" />
                </FormItem>
              )}
            />

            {/* Telefone */}
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.phone")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholders.phone")}
                      {...field}
                      maxLength={15}
                      onChange={(e) =>
                        field.onChange(formatTelefone(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormErrorMessage name="telefone" />
                </FormItem>
              )}
            />
          </div>

          {/* Assunto */}
          <FormField
            control={form.control}
            name="assunto"
            render={() => (
              <FormItem>
                <FormLabel>{t("fields.subject")}</FormLabel>
                <FormControl>
                  <Controller
                    name="assunto"
                    control={form.control}
                    render={({ field: selectField }) => (
                      <Select
                        {...selectField}
                        onValueChange={(val) => selectField.onChange(val)}
                      >
                        <SelectTrigger className="w-full bg-[#2b2b2b]">
                          <SelectValue placeholder={t("placeholders.subject")} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2b2b2b] text-white">
                          {[
                            "Threat Intelligence",
                            "Brand Protection",
                            "Investigações Digitais",
                            "Treinamentos",
                            "Consultoria",
                            "Outros",
                          ].map((item) => (
                            <SelectItem
                              key={item}
                              value={item}
                              className="data-[highlighted]:bg-red-700 data-[state=checked]:bg-red-800"
                            >
                              {t(`subjects.${item}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormControl>
                <FormErrorMessage name="assunto" />
              </FormItem>
            )}
          />

          {/* Mensagem */}
          <FormField
            control={form.control}
            name="mensagem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.message")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("placeholders.message")} {...field} />
                </FormControl>
                <FormErrorMessage name="mensagem" />
              </FormItem>
            )}
          />

          {/* Botão */}
          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🛡️</span> {t("send")}
          </Button>

          {/* Rodapé */}
          <p className="text-xs mt-2 text-gray-400 flex items-center gap-1">
            <span>🛡️</span> {t("security")}
          </p>
          <p className="text-xs text-gray-400 flex items-center ">
            {t("required")}
          </p>
        </form>
      </Form>
    </FormProvider>
  );
};
