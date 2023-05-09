
// document = representa a nuestro documento HTML 
// window = representa la ventana que contiene un documento DOM cargado en esa ventana
// El árbol DOM incluye elementos como <body> y <table> 
//.getElementById = es uno de los metodos de document y con este podremos llamar a cualquier 
// - elemento de HTML que tenga el "id" que nosotros necesitemos 

//.addEventListener = para invocar evento como /cick = dar click,/ = notar el mause al pasar x encima, 
//- /load = se dispara cuando un recurso y sus recursos dependientes han terminado de cargar como la pagina HTML

//.innerHTML = muestra lo que esta dentro del 'span' en HTML y tambien puedes sobreescribirlo 
//.createElement = para crear elementos en HTML como parrafos 'p' 
//.appendChild = nos ayuda a coger elementos creados con .js para insertarlos en HTML 
//location = representa a la ubicacion en la que estas por ejm una locacion es el HTML y otra es la .js
//.reload = recargar la pagina
//.disabled = este atributo sirve para desabilitar un boton 'creo' prompt
//[] = significa que dentro de estos podemos meter valores que querramos en este caso meteremos los objetos que estamos construyendo
//.push = lo que este dentro del metodo lo va a empujar al arreglo para poderlo guardar 
//Ctrl + D = atajo para seleccionar palabras identicas // Ctrl+Alt+FlechahaciaAbajo = para seleccionar en una direccion 

const sectionReiniciar = document.getElementById('reiniciar')
const botonPersonajeJugador = document.getElementById('boton-seleccionar-personaje')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const spanNombrePersonaje = document.getElementById('nombre-personaje')

const spanNombreEnemigo = document.getElementById('nombre-enemigo')

const spanVidaJugador = document.getElementById('vida-personaje')
const spanVidaEnemigo = document.getElementById('vida-enemigo')

const seccionMensaje = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

let personajes = []
let opcionDePersonajes
let ataqueEnemigo = []
let personajeJuno
let personajeAsta
let personajeLucifero
let guardarNombrePersonaje
let ataquesPersonaje
let ataquesPersonajeEnemigo
let botonNoMagia 
let botonDiavlo 
let botonMana
let botones = []
let ataqueJugador = []
let vidaJugador = 3
let vidaEnemigo = 3

sectionReiniciar.style.display = 'none'

class personaje {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto 
        this.vida = vida 
        this.ataques = []
    }
}

let asta = new personaje('Asta', './assets/Asta.png', 2)
let juno = new personaje('Juno', './assets/Juno.png', 2)
let lucifero = new personaje('Lucifero', './assets/Lucifero.png', 2)

asta.ataques.push(
    {nombre: 'nomagia☘', id:'boton-nomagia'},
    {nombre: 'nomagia☘', id:'boton-nomagia'},
    {nombre: 'nomagia☘', id:'boton-nomagia'},
    {nombre: 'diavlo👿', id:'boton-diavlo'},
    {nombre: 'mana🎆', id:'boton-mana'},
    )
    
juno.ataques.push(
    {nombre: 'mana🎆', id:'boton-mana'},
    {nombre: 'mana🎆', id:'boton-mana'},
    {nombre: 'mana🎆', id:'boton-mana'},
    {nombre: 'nomagia☘', id:'boton-nomagia'},
    {nombre: 'diavlo👿', id:'boton-diavlo'},
    )

lucifero.ataques.push(
    {nombre: 'diavlo👿', id:'boton-diavlo'},
    {nombre: 'diavlo👿', id:'boton-diavlo'},
    {nombre: 'diavlo👿', id:'boton-diavlo'},
    {nombre: 'mana🎆', id:'boton-mana'},
    {nombre: 'nomagia☘', id:'boton-nomagia'},
    )

personajes.push(asta,juno,lucifero)

function iniciarJuego() { 
    
    sectionSeleccionarAtaque.style.display = 'none'

    personajes.forEach((personaje) => {
        opcionDePersonajes = `
        <input type="radio" name="personaje" id=${personaje.nombre} /> 
        <label class="tarjeta-personaje" for=${personaje.nombre}> 
             <p>${personaje.nombre}</p>
             <img src=${personaje.foto} alt=${personaje.nombre}>
         </label>
        `
        contenedorTarjetas.innerHTML += opcionDePersonajes

        personajeJuno = document.getElementById('Juno')
        personajeAsta = document.getElementById('Asta')
        personajeLucifero = document.getElementById('Lucifero')
    })
    
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarPersonajeJugador() {

    if (personajeAsta.checked){
         spanNombrePersonaje.innerHTML = personajeAsta.id 
         guardarNombrePersonaje = personajeAsta.id  
         personajeJuno.disabled = true 
         personajeLucifero.disabled = true 
    }
    else if (personajeJuno.checked){
        spanNombrePersonaje.innerHTML = personajeJuno.id 
        guardarNombrePersonaje = personajeJuno.id
        personajeAsta.disabled = true 
        personajeLucifero.disabled = true 
    }
   else if (personajeLucifero.checked){
        spanNombrePersonaje.innerHTML = personajeLucifero.id
        guardarNombrePersonaje = personajeLucifero.id 
        personajeAsta.disabled = true 
        personajeJuno.disabled = true 
    }
    else { alert('SELECCIONA UNA MASCOTA')
    }
        sectionSeleccionarAtaque.style.display = 'flex'
        extraerAtaques(guardarNombrePersonaje)
        seleccionarPersonjeEnemigo()
        
}

function extraerAtaques (guardarNombrePersonaje) {
    let ataques 

    for (let i = 0; i < personajes.length; i++) {                    //clase 54-55
        if (guardarNombrePersonaje === personajes[i].nombre) {
            ataques = personajes[i].ataques
        }
    }
        mostrarAtaques(ataques) 
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesPersonaje = `
        <button id=${ataque.id} class="boton-de-ataque BtnAtaque">${ataque.nombre} </button>
        `
        contenedorAtaques.innerHTML += ataquesPersonaje
    })
         botonNoMagia = document.getElementById('boton-nomagia')
         botonDiavlo = document.getElementById('boton-diavlo')
         botonMana = document.getElementById('boton-mana')
         botones = document.querySelectorAll('.BtnAtaque')     // clase 56  
        
}

function secuenciaAtaque () {                              // clase 56 
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) =>{
            if (e.target.textContent === 'nomagia☘') {
                ataqueJugador.push('No Magia')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }
            else if (e.target.textContent === 'mana🎆'){
                ataqueJugador.push('Mana')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }
            else {             
                ataqueJugador.push('Diavlo')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }        
            ataqueAleatorioEnemigo()
        })        
    })
}

function seleccionarPersonjeEnemigo(){
    let nombreAleatorio = aleatorio(0, personajes.length -1)
    
    spanNombreEnemigo.innerHTML = personajes[nombreAleatorio].nombre               //clase 53
    ataquesPersonajeEnemigo = personajes[nombreAleatorio].ataques                  //clase 57 
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueEnemigoA = aleatorio(0,ataquesPersonajeEnemigo.length -1)            // clase 57 

    if (ataqueEnemigoA == 0 || ataqueEnemigoA == 1) {
        ataqueEnemigo.push('Mana')
    }
    else if (ataqueEnemigoA == 3 || ataqueEnemigoA == 4) {
        ataqueEnemigo.push('No Magia')    
    }
    else { 
        ataqueEnemigo.push('Diavlo')
    }
    console.log(ataqueEnemigo)
    iniciarPelea ()
}

function iniciarPelea(){
    if(ataqueJugador.length == 5 ){
        combate()
    }
}

function aleatorio( min , max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

function combate() {

    if ( ataqueJugador == ataqueEnemigo ) {
        crearMensaje( "¡EMPATE! 🤼" )
    } 
    else if ( ataqueJugador == 'Mana' && ataqueEnemigo == 'Diavlo' ) {
        crearMensaje( "¡GANASTE! 🥳" )
        vidaEnemigo-- 
        spanVidaEnemigo.innerHTML = vidaEnemigo
    } 
    else if ( ataqueJugador == 'No Magia' && ataqueEnemigo == 'Mana' ) {
        crearMensaje( "¡GANASTE! 🥳" )
        vidaEnemigo-- 
        spanVidaEnemigo.innerHTML = vidaEnemigo
    } 
    else if ( ataqueJugador == 'Diavlo' && ataqueEnemigo == 'No Magia' ) {
        crearMensaje( "¡GANASTE! 🥳" )
        vidaEnemigo-- 
        spanVidaEnemigo.innerHTML = vidaEnemigo
    } 
    else {
        crearMensaje( "PERDISTE... 😢" )
        vidaJugador-- 
        spanVidaJugador.innerHTML = vidaJugador
    }
        revisarVidas()
}

function revisarVidas() {
   
    if(vidaEnemigo == 0){
        crearMensajeFinal("FELICIDADES PNCHE OTAKU . GANASTE")
    }
    else if(vidaJugador == 0) {
        crearMensajeFinal("BUA.. ALTO PERDEDOR")
    }
}

function crearMensaje(resultado) {
    
    let nAtaqueJugador = document.createElement('p')
    let nAtaqueEnemigo = document.createElement('p')

    seccionMensaje.innerHTML = resultado  
    nAtaqueJugador.innerHTML = ataqueJugador
    nAtaqueEnemigo.innerHTML = ataqueEnemigo
    ataqueDelJugador.appendChild(nAtaqueJugador)
    ataqueDelEnemigo.appendChild(nAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    seccionMensaje.innerHTML = resultadoFinal

    botonMana.disabled = true 
    botonNoMagia.disabled = true 
    botonDiavlo.disabled = true 

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)