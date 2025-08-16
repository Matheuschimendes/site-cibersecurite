"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";

// Validação
const formSchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Digite um email válido"),
  empresa: z.string().optional(),
  telefone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(val),
      { message: "Telefone inválido. Formato esperado: (99) 99999-9999" }
    ),
  assunto: z.string().optional(),
  mensagem: z.string().min(2, "A mensagem deve ter pelo menos 2 caracteres"),
});

export const Formulario = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
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

    if (res.ok) alert("Mensagem enviada com sucesso");
    else alert("Erro ao enviar a mensagem");
  }

  // Função para formatar o telefone
  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return `${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative group flex flex-col gap-6 p-10 rounded-[20px] border border-transparent
          bg-gradient-to-br from-[#1b1b1b] via-[#121212] to-[#0a0a0a]
          shadow-[0_0_15px_rgba(227,35,32,0.15)] overflow-hidden"
      >
        <h2><span>🛡️</span> Envie uma mensagem segura</h2>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome *</FormLabel>
                <FormControl><Input placeholder="Seu nome completo" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl><Input type="email" placeholder="seu@email.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <FormControl><Input placeholder="Nome da empresa" {...field} /></FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(11) 99999-9999"
                    {...field}
                    maxLength={15}
                    onChange={(e) => field.onChange(formatTelefone(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="assunto"
          render={() => (
            <FormItem>
              <FormLabel>Assunto *</FormLabel>
              <FormControl>
                <Controller
                  name="assunto"
                  control={form.control}
                  render={({ field: selectField }) => (
                    <Select {...selectField} onValueChange={(val) => selectField.onChange(val)}>
                      <SelectTrigger className="w-full bg-[#2b2b2b]">
                        <SelectValue placeholder="Selecione o assunto" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2b2b2b] text-white">
                        <SelectItem value="intelligence" className="data-[highlighted]:bg-red-700 data-[state=checked]:bg-red-800">
                          Threat Intelligence
                        </SelectItem>
                        <SelectItem value="protection" className="data-[highlighted]:bg-red-700 data-[state=checked]:bg-red-800">
                          Brand Protection
                        </SelectItem>
                        <SelectItem value="investigacoes" className="data-[highlighted]:bg-red-700 data-[state=checked]:bg-red-800">
                          Investigações Digitais
                        </SelectItem>
                        <SelectItem value="treinamentos" className="data-[highlighted]:bg-red-700 data-[state=checked]:bg-red-800">
                          Treinamentos
                        </SelectItem>
                        <SelectItem value="consultoria" className="data-[highlighted]:bg-red-700 data-[state=checked]:bg-red-800">
                          Consultoria
                        </SelectItem>
                        <SelectItem value="outros" className="data-[highlighted]:bg-red-700 data-[state=checked]:bg-red-800">
                          Outros
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem *</FormLabel>
              <FormControl><Textarea placeholder="Digite sua mensagem" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🛡️</span> Enviar mensagem
        </Button>

        <p className="text-xs mt-2 text-gray-400 flex items-center gap-1">
          <span>🛡️</span> Suas informações são protegidas por criptografia e tratadas com confidencialidade.
        </p>
      </form>
    </Form>
  );
};
