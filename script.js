// Aquieu vou armazenar os horários já reservados
let horariosReservados = [];

// aqui eu carrego os horarios
function carregarHorarios() {
    let selectHora = document.getElementById("hora");

    // Verifica se o elemento existe antes de prosseguir
    if (!selectHora) {
        console.error("Elemento #hora não encontrado!");
        return;
    }

    selectHora.innerHTML = ""; // Limpa antes de atualizar

    let horaInicial = 8; // Horário de início (08:00)
    let horaFinal = 18; // Horário de término (18:00)

    for (let hora = horaInicial; hora <= horaFinal; hora++) {
        let horaFormatada = hora < 10 ? `0${hora}:00` : `${hora}:00`;

        // Verifica se o horário já está reservado
        if (!horariosReservados.includes(horaFormatada)) {
            let option = document.createElement("option");
            option.value = horaFormatada;
            option.textContent = horaFormatada;
            selectHora.appendChild(option);
        }
    }
}

// Função WhatsAppp
function enviarWhatsApp() {
    let nome = document.getElementById("nome").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let data = document.getElementById("data").value;
    let hora = document.getElementById("hora").value;

    // Verifica campos foram preenchidos
    if (nome === "" || telefone === "" || data === "" || hora === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let telefoneDiarista = "555184464900"; // Número da diarista

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

    // Abre o WhatsApp com a mensagemm preenchida
    window.open(link, "_blank");
}

// Atualiza os horários disponíveis quando a página carrega
document.addEventListener("DOMContentLoaded", carregarHorarios);
