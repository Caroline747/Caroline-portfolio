// Inicialize com seu User ID (do painel da EmailJS)
    emailjs.init("pjGsV2By3WOJKtM28");

    const form = document.getElementById("contactForm");
    const msgBox = document.getElementById("formMsg");
    const btn = form.querySelector("button");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      msgBox.textContent = "Enviando...";
      msgBox.className = "msg";
      btn.disabled = true;

      emailjs.sendForm("service_lex4xjn", "template_b4fovbc", this)
        .then(() => {
          msgBox.textContent = "Mensagem enviada com sucesso!";
          msgBox.className = "msg success";
          form.reset();
        })
        .catch(err => {
          console.error("Erro:", err);
          msgBox.textContent = "Erro ao enviar. Tente novamente.";
          msgBox.className = "msg error";
        })
        .finally(() => {
          btn.disabled = false;
        });
    });