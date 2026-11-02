import { FORMATIONS } from "./formations.js";

const canvas = document.getElementById("cancha");
const ctx = canvas.getContext("2d");

const imagenes = {
  cancha: "./assets/cancha.png",
  jugador: "./assets/camiseta.png",
  arquero: "./assets/camiseta-arquero.png"
};

function cargarImagen(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`No se pudo cargar: ${src}`));

    img.src = src;
  });
}

async function renderFormation(formacion) {
  const posiciones = FORMATIONS[formacion];

  if (!posiciones) {
    throw new Error(`Formación no encontrada: ${formacion}`);
  }

  const [cancha, jugador, arquero] = await Promise.all([
    cargarImagen(imagenes.cancha),
    cargarImagen(imagenes.jugador),
    cargarImagen(imagenes.arquero)
  ]);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(cancha, 0, 0, canvas.width, canvas.height);

  posiciones.forEach(({ role, x, y }) => {
    const esArquero = role === "GK";
    const camiseta = esArquero ? arquero : jugador;

    const ancho = esArquero ? 49 : 45;
    const alto = esArquero ? 58 : 54;

    const posX = (x / 100) * canvas.width;
    const posY = (y / 100) * canvas.height;

    ctx.drawImage(
      camiseta,
      posX - ancho / 2,
      posY - alto / 2,
      ancho,
      alto
    );
  });
}

renderFormation("4-3-3").catch(console.error);