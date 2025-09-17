// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
class Amigos {
    //hacer Set los elementos, previene que los elementos se dupliquen
    #amigos = new Set();

    constructor(listaDeAmigos = []) {
        this.#amigos = new Set(listaDeAmigos);
    }

    getNombres() {
        return Array.from(this.#amigos);
    }

    setNombre(amigo) {
        if(typeof amigo === 'string' && amigo.trim() !== "") this.#amigos.add(amigo)
        else alert('Verifica el mensaje e intentalo nuevamente');
    }

    existe(amigo){
        return this.#amigos.has(amigo);
    }

    getLargo(){
        return this.#amigos.size;
    }

    borrarNombres() {
        this.#amigos.clear();
    }

}

const amigos = new Amigos();
const ulListReference = document.getElementById('listaAmigos');
const refResultado = document.getElementById('resultado');
const refLimpiarLista = document.getElementById("limpiarLista");
const amigoInput = document.getElementById('amigo');
const refSortearAmigo = document.getElementById('sortearAmigo');

function crearImagenBoton(src, alt) {
    const boton = document.createElement('img');
    boton.src = src;
    boton.alt = alt;
    return boton;
}

function generarRandom(largo) {
    const numeroRandom = Math.floor(Math.random()*largo);
    return numeroRandom;
}

function limpiarLista(){
   amigos.borrarNombres();
   ulListReference.replaceChildren();
   refResultado.replaceChildren();
   refLimpiarLista.style.display = 'none';
   const imagen = crearImagenBoton("./assets/play_circle_outline.png", "Ícono para sortear");
   const texto = document.createTextNode("Sortear amigo");
   refSortearAmigo.replaceChildren(imagen, texto);
   amigoInput.value = "";
}

function sortearAmigo() {
    const getlargoListaNombres = amigos.getLargo();
    if(getlargoListaNombres <= 1) {
        alert("Por favor, ingresa al menos dos amigos para iniciar el sorteo");
        return;
    }

    ulListReference.replaceChildren();

    const numeroRandom = generarRandom(getlargoListaNombres);
    const alAzar = amigos.getNombres()[numeroRandom];
    
    const sorteado = document.createElement('li');
    sorteado.innerHTML = `el amigo secreto sorteado es: ${alAzar}`
    refResultado.replaceChildren(sorteado);
    refResultado.style.display = 'list-item';
    //se puede cambiar tanto el ícono como el texto del botón
    const imagen = crearImagenBoton("./assets/play_circle_outline.png", "Ícono para sortear");
    const texto = document.createTextNode('Sortear de la lista anterior');
    refSortearAmigo.replaceChildren(imagen, texto);
}

function crearAmigo(valor){
    const nuevoNombre = document.createElement('li');
    nuevoNombre.innerHTML = valor;
    return nuevoNombre;
}

function renderizarLista() {
    ulListReference.replaceChildren();
    for (const amigo of amigos.getNombres()) {
        ulListReference.appendChild(crearAmigo(amigo));
    }
}

function agregarAmigo() {
    var regex = /^[\p{L}\p{M}\s.]+$/u;
    const nombreAmigo = amigoInput.value?.trim();
    if(nombreAmigo === ""){
        alert("Por favor, inserte un nombre");
        return;
    }

    if(!regex.test(nombreAmigo)) {
        alert("Verifica el nombre y elimina caracteres especiales e intente nuevamente.");
        return;
    }

    if(amigos.existe(nombreAmigo)) {
        alert("Estas ingresando un nombre que ya está en la lista");
        return;
    }

    amigos.setNombre(nombreAmigo);

    if(amigos.getLargo() >= 1 && refLimpiarLista.style.display === "none" ) {
        refLimpiarLista.style.display = 'flex';
    }

    refResultado.style.display = 'none';

    ulListReference.replaceChildren();

    amigoInput.value = "";

    renderizarLista();
}

amigoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarAmigo();
    }
});