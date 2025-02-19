// Lista para armazenar os horários já reservados
let horariosReservados = [];

// Função para carregar os horários disponíveis no <select>
function carregarHorarios() {
    let selectHora = document.getElementById("hora");
    let listaReservas = document.getElementById("lista-horarios-reservados");

    // Verifica se os elementos existem antes de prosseguir
    if (!selectHora || !listaReservas) {
        console.error("Elementos #hora ou #lista-horarios-reservados não encontrados!");
        return;
    }

    selectHora.innerHTML = ""; // Limpa o campo antes de atualizar
    listaReservas.innerHTML = ""; // Limpa a lista de reservas

    let horaInicial = 8; // Horário de início (08:00)
    let horaFinal = 18; // Horário de término (18:00)

    for (let hora = horaInicial; hora <= horaFinal; hora++) {
        let horaFormatada = hora < 10 ? `0${hora}:00` : `${hora}:00`;

        if (!horariosReservados.includes(horaFormatada)) {
            let option = document.createElement("option");
            option.value = horaFormatada;
            option.textContent = horaFormatada;
            selectHora.appendChild(option);
        } else {
            let listItem = document.createElement("li");
            listItem.innerHTML = `${horaFormatada} 
                <button class="liberar-btn btn btn-danger btn-sm ms-2" onclick="liberarHorarioManual('${horaFormatada}')">Liberar</button>`;
            listaReservas.appendChild(listItem);
        }
    }
}

// Função para confirmar agendamento e enviar para o WhatsApp
function enviarWhatsApp() {
    let nome = document.getElementById("nome").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let data = document.getElementById("data").value;
    let hora = document.getElementById("hora").value;

    if (nome === "" || telefone === "" || data === "" || hora === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let telefoneDiarista = "555184464900"; // Número da Francielle

    // Formata a data no estilo brasileiro (DD/MM/AAAA)
    let dataFormatada = data.split("-").reverse().join("/");

    // Mensagem personalizada para WhatsApp
    let mensagem = `Olá! Meu nome é *${nome}* e gostaria de agendar uma limpeza para o dia *${dataFormatada}* às *${hora}*.\nMeu WhatsApp para contato é: *${telefone}*.\nPodemos confirmar?`;

    // Adiciona o horário reservado para evitar duplicação
    if (!horariosReservados.includes(hora)) {
        horariosReservados.push(hora);
    }

    carregarHorarios(); // Atualiza os horários disponíveis

    // Gera o link do WhatsApp
    let link = `https://wa.me/${telefoneDiarista}?text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp com a mensagem preenchida
    window.open(link, "_blank");
}

// Função para exibir o painel de administração apenas para a Francielle
function autenticarDiarista() {
    let senha = prompt("Digite a senha para acessar o painel de administração:");

    if (senha === "231416") { // Nova senha definida
        document.getElementById("painel-admin").style.display = "block";
        alert("Acesso concedido!");
    } else {
        alert("Senha incorreta! Acesso negado.");
    }
}

// Função para liberar horários manualmente
function liberarHorarioManual(hora) {
    let index = horariosReservados.indexOf(hora);
    if (index !== -1) {
        horariosReservados.splice(index, 1);
        alert(`O horário ${hora} foi liberado.`);
    }
    carregarHorarios(); // Atualiza a lista de horários disponíveis
}

// Atualiza os horários disponíveis quando a página carrega
document.addEventListener("DOMContentLoaded", carregarHorarios);