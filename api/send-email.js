export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nome, email, mensagem } = req.body;

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          sender: { name: nome, email: email },
          to: [{ email: "karolsamara97@gmail.com", name: "Caroline" }],
          subject: "Nova mensagem do formulário",
          htmlContent: `
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensagem:</strong><br>${mensagem}</p>
          `
        })
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      res.status(200).json({ success: true, message: "Mensagem enviada com sucesso!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao enviar a mensagem." });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
