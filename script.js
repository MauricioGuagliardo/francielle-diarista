// Lista para armazenar os turnos reservados, considerando data e cliente
let turnosReservados = [];

// Função para carregar os turnos disponíveis no <select>, considerando a data selecionada
function carregarTurnos() {
  let selectTurno = document.getElementById("hora");
  let listaReservas = document.getElementById("lista-horarios-reservados");
  let dataSelecionada = document.getElementById("data").value; // Formato: AAAA-MM-DD

  if (!selectTurno || !listaReservas) {
    console.error("Elementos #hora ou #lista-horarios-reservados não encontrados!");
    return;
  }

  selectTurno.innerHTML = "";
  listaReservas.innerHTML = "";

  // Define os turnos
  let turnos = ["Manhã (08:00 - 12:00)", "Tarde (13:00 - 18:00)"];

  turnos.forEach(turno => {
    // Verifica se o turno já foi reservado para a data selecionada
    let reserva = turnosReservados.find(r => r.turno === turno && r.data === dataSelecionada);
    if (!reserva) {
      let option = document.createElement("option");
      option.value = turno;
      option.textContent = turno;
      selectTurno.appendChild(option);
    } else {
      let listItem = document.createElement("li");
      listItem.innerHTML = `${turno} reservado para ${reserva.cliente} 
        <button class="liberar-btn btn btn-danger btn-sm ms-2" onclick="liberarTurnoManual('${turno}', '${dataSelecionada}')">Liberar</button>`;
      listaReservas.appendChild(listItem);
    }
  });
}

// Função para confirmar agendamento e enviar para o WhatsApp
function enviarWhatsApp() {
  let nome = document.getElementById("nome").value.trim();
  let telefone = document.getElementById("telefone").value.trim();
  let data = document.getElementById("data").value; // Formato: AAAA-MM-DD
  let turno = document.getElementById("hora").value;

  if (nome === "" || telefone === "" || data === "" || turno === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  let telefoneDiarista = "555184464900"; // Número da Francielle
  let dataFormatada = data.split("-").reverse().join("/");

  let mensagem = `Olá! Meu nome é *${nome}* e gostaria de agendar uma limpeza para o dia *${dataFormatada}* no turno *${turno}*.
Meu WhatsApp para contato é: *${telefone}*.
Podemos confirmar?`;

  // Registra a reserva somente se o turno ainda não estiver reservado para a data selecionada
  if (!turnosReservados.some(r => r.turno === turno && r.data === data)) {
    turnosReservados.push({ turno: turno, data: data, cliente: nome });
  } else {
    alert("Esse turno já está reservado para a data selecionada.");
    return;
  }

  carregarTurnos();

  let link = `https://wa.me/${telefoneDiarista}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

// Função para liberar turno manualmente, considerando turno e data
function liberarTurnoManual(turno, data) {
  let index = turnosReservados.findIndex(r => r.turno === turno && r.data === data);
  if (index !== -1) {
    turnosReservados.splice(index, 1);
    alert(`O turno ${turno} na data ${data} foi liberado.`);
  }
  carregarTurnos();
}

// Função para exibir o painel de administração apenas para a Francielle (acesso com senha)
function autenticarDiarista() {
  let senha = prompt("Digite a senha para acessar o painel de administração:");
  if (senha === "231416") { // Senha definida
    document.getElementById("painel-admin").style.display = "block";
    alert("Acesso concedido!");
  } else {
    alert("Senha incorreta! Acesso negado.");
  }
}

// Atualiza os turnos disponíveis ao carregar a página e quando a data é alterada
document.addEventListener("DOMContentLoaded", () => {
  carregarTurnos();
  document.getElementById("data").addEventListener("change", carregarTurnos);
});
