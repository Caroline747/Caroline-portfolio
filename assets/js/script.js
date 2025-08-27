document.getElementById("contatoForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    nome: form.nome.value,
    email: form.email.value,
    mensagem: form.mensagem.value
  };

  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById("status").innerHTML = 
    result.success 
      ? `<span style="color:green;">${result.message}</span>` 
      : `<span style="color:red;">${result.message}</span>`;

  if (result.success) form.reset();
});