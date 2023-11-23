// Constantes
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

// Elementos del DOM
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const puntosHTML = document.querySelectorAll("small");

// Variables de juego
let deck = [];
let puntosJugador = 0;
let puntosComputadora = 0;

// Función para crear un nuevo deck y barajarlo
const crearYBarajarDeck = () => {
  deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(`${i}${tipo}`);
    }
  }
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(`${esp}${tipo}`);
    }
  }
  deck = _.shuffle(deck);
};

// Función para pedir una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  return carta;
};

// Función para obtener el valor de una carta
const valorCarta = (carta) => {
  const valor = carta.slice(0, -1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : parseInt(valor);
};

// Función para actualizar la interfaz de usuario con una nueva carta
const mostrarCarta = (carta, jugador) => {
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  jugador.appendChild(imgCarta);
};

// Función para el turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  while (puntosComputadora < puntosMinimos && puntosMinimos <= 21) {
    const carta = pedirCarta();
    puntosComputadora += valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;
    mostrarCarta(carta, divCartasComputadora);
  }

  setTimeout(() => {
    const mensaje =
      puntosComputadora === puntosMinimos
        ? "Nadie gana :("
        : puntosMinimos > 21
        ? "Computadora gana"
        : puntosComputadora > 21
        ? "Jugador Gana"
        : "Computadora Gana";
    alert(mensaje);
  }, 100);
};

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador += valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;
  mostrarCarta(carta, divCartasJugador);

  if (puntosJugador > 21 || puntosJugador === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  console.clear();
  crearYBarajarDeck();

  puntosJugador = 0;
  puntosComputadora = 0;

  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;

  divCartasComputadora.innerHTML = "";
  divCartasJugador.innerHTML = "";

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});

// Inicializar el juego
crearYBarajarDeck();
