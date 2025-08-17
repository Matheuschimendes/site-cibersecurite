import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(request: Request) {
  const { name, email, empresa, telefone, assunto, mensagem } =
    await request.json();

  // Validação de campos obrigatórios
  if (!name || !email || !mensagem) {
    return new NextResponse(
      JSON.stringify({ message: "Campos obrigatórios faltando" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // , // use "App Password" se MFA estiver ativado
      },
    });

    // Envia o e-mail para o destinatário

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, // e-mail autenticado no Zoho
      replyTo: `"${name}" <${email}>`, // cliente aparece ao clicar em "Responder"
      to: process.env.EMAIL_USER, // você recebe
      subject: assunto || "Sem assunto",
      text: mensagem,
      html: `
      <body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#ffffff;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;padding:20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background-color:#e32320;padding:20px;text-align:center;color:#ffffff;">
                    <p style="margin:0;font-size:12px;font-weight:bold;">KRYFAL</p>
                    <div style="display:flex;justify-content:center;gap:10px;">
                      <p style="margin:0;font-size:20px;font-weight:bold;">Assunto: </p>
                      <p style="margin:0;font-size:20px;font-weight:bold;">${
                        assunto || "Tecnologia"
                      }</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px;color:black;">
                    <p style="margin:0;font-size:16px;font-weight:bold;">Mensagem:</p>
                    <p style="font-size:16px;line-height:1.5;">${mensagem}</p>
                    <hr style="border:none;border-top:1px solid #e32320;margin:20px 0;"/>
                    <p style="margin:0;font-size:16px;font-weight:bold;">Informações de contato:</p>
                    <p style="margin:4px 0;"><strong>Nome:</strong> ${name}</p>
                    <p style="margin:4px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin:4px 0;"><strong>Telefone:</strong> ${
                      telefone || "-"
                    }</p>
                    <p style="margin:4px 0;"><strong>Empresa:</strong> ${
                      empresa || "-"
                    }</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color:black;padding:10px;text-align:center;font-size:12px;color:white;">
                    <p style="margin:0;">&copy; 2025 Site Cibersecurite. Todos os direitos reservados.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      `,
    });

    return new NextResponse(
      JSON.stringify({ message: "Mensagem enviada com sucesso" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return new NextResponse(
      JSON.stringify({
        message: "Erro ao enviar a mensagem",
        error: (err as Error).message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
