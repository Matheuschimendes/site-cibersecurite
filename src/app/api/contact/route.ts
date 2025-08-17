import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, empresa, telefone, assunto, mensagem } =
    await request.json();

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use "App Password" se MFA estiver ativado
      },
    });

    await transport.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: `${process.env.EMAIL_USER}`, // substitua pelo email de destino real
      subject: assunto || "Sem assunto",
      text: mensagem,
      html: `
      <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #ffffff;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color: #ffffff; padding: 20px 0"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            "
          >
            <!-- Cabeçalho -->
            <tr>
              <td
                style="
                  background-color: #e32320;
                  padding: 20px;
                  text-align: center;
                  color: #ffffff;
                "
              >
                <p style="margin: 0; font-size: 12px; font-weight: bold">
                  KRYFAL
                </p>
                <div style="display: flex">
                  <p style="margin: 0; font-size: 20px; font-weight: bold">
                    Assunto:
                  </p>

                  <p style="margin: 0; font-size: 20px; font-weight: bold">
                    Tecnologia
                  </p>
                </div>
              </td>
            </tr>
            <!-- Corpo -->
            <tr>
              <td style="padding: 20px; color: black">
                <p style="margin: 0; font-size: 16px; font-weight: bold">
                  Mensagem:
                </p>
                <p style="font-size: 16px; line-height: 1.5">${mensagem}</p>
                <hr
                  style="
                    border: none;
                    border-top: 1px solid #e32320;
                    margin: 20px 0;
                  "
                />
                <p style="margin: 0; font-size: 16px; font-weight: bold">
                  Informações de contato:
                </p>
                <p style="margin: 4px 0"><strong>Nome:</strong> ${name}</p>
                <p style="margin: 4px 0"><strong>Email:</strong> ${email}</p>
                <p style="margin: 4px 0">
                  <strong>Telefone:</strong> ${telefone}
                </p>
                <p style="margin: 4px 0">
                  <strong>Empresa:</strong> ${empresa}
                </p>
              </td>
            </tr>
            <!-- Rodapé -->
            <tr>
              <td
                style="
                  background-color: black;
                  padding: 10px;
                  text-align: center;
                  font-size: 12px;
                  color: white;
                "
              >
                <p style="margin: 0">
                  &copy; 2025 Site Cibersecurite. Todos os direitos reservados.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
`,
    });

    return NextResponse.json({
      message: "Mensagem enviada com sucesso",
    });
  } catch (err) {
    console.error("Erro ao enviar email:", err); // 🔹 mostra o erro real no terminal
    return NextResponse.json(
      { message: "Erro ao enviar a mensagem", error: (err as Error).message },
      { status: 500 }
    );
  }
}
