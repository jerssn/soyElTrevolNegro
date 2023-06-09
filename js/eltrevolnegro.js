
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
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null 
let personajes = []
let personajesEnemigos = []
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
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataqueJugador = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidaJugador = 3
let vidaEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let jugadorObjeto  
let mapaBackground = new Image()
mapaBackground.src = "./assets/mapa.png"

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 800

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

sectionReiniciar.style.display = 'none'

class personaje {
    constructor(nombre, foto, vida, id = null ) {
        this.id = id
        this.nombre = nombre
        this.foto = foto 
        this.vida = vida 
        this.ataques = []
        this.ancho = 80
        this.alto = 80   
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto 
        this.velocidadX = 0
        this.velocidadY = 0
        
    }
    
    pintarPersonaje() {
    lienzo.drawImage(
      this.mapaFoto,
      this.x, 
      this.y,
      this.ancho,
      this.alto
    )
    }
}

let asta = new personaje('Asta', './assets/Asta.png', 5)
let juno = new personaje('Juno', './assets/Juno.png', 5)
let lucifero = new personaje('Lucifero', './assets/Lucifero.png', 5)

const ASTA_ATAQUES =[                                   // class 79
    {nombre: 'nomagia☘', id:'boton-nomagia'},
    {nombre: 'nomagia☘', id:'boton-nomagia'},
    {nombre: 'nomagia☘', id:'boton-nomagia'},
    {nombre: 'mana🎆', id:'boton-mana'},
    {nombre: 'diavlo👿', id:'boton-diavlo'},
  ]
asta.ataques.push(...ASTA_ATAQUES)
    
const JUNO_ATAQUES = [
    {nombre: 'mana🎆', id:'boton-mana'},
    {nombre: 'mana🎆', id:'boton-mana'},
    {nombre: 'mana🎆', id:'boton-mana'},
    {nombre: 'nomagia☘', id:'boton-nomagia'},
    {nombre: 'diavlo👿', id:'boton-diavlo'},
]
juno.ataques.push(...JUNO_ATAQUES)

const LUCIFERO_ATAQUES = [
    {nombre: 'diavlo👿', id:'boton-diavlo'},
    {nombre: 'diavlo👿', id:'boton-diavlo'},
    {nombre: 'diavlo👿', id:'boton-diavlo'},
    {nombre: 'mana🎆', id:'boton-mana'},
    {nombre: 'nomagia☘', id:'boton-nomagia'},
]
lucifero.ataques.push(...LUCIFERO_ATAQUES)

personajes.push(asta,juno,lucifero)

function iniciarJuego() { 
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = "none"

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
    unirseAlJuego()
}

function unirseAlJuego() {
  fetch("http://localhost:8080/unirse")
    .then(function (res) {
      if (res.ok) {
        res.text()
          .then(function (respuesta) {
              console.log(respuesta)
              jugadorId = respuesta
          })
      }
    })
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
    
    seleccionarPersonaje(guardarNombrePersonaje)
    sectionVerMapa.style.display = "flex"
    //sectionSeleccionarAtaque.style.display = 'flex'
    
    extraerAtaques(guardarNombrePersonaje) //class66 mascotaJugador=guardarNombrePersonaje
    iniciarMapa()
}

function seleccionarPersonaje(guardarNombrePersonaje) {
  fetch(`http://localhost:8080/personaje/${jugadorId}`, {
    method: "post", 
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({
      personaje: guardarNombrePersonaje
    })
  })
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
        <button id=${ataque.id} class="boton-de-ataque BtnAtaque">${ataque.nombre}</button>
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
                boton.disabled = true
            }
            else if (e.target.textContent === 'mana🎆'){
                ataqueJugador.push('Mana')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                botones.disabled = true
            }
            else {             
                ataqueJugador.push('Diavlo')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }      
            if (ataqueJugador.length === 5 ) {
                  enviarAtaques()
            } 
        })        
    })
}

function enviarAtaques() {
  fetch(`http://localhost:8080/personaje/${jugadorId}/ataques`, {
    method: "post", 
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({
      ataques: ataqueJugador
    })
  })
      intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
  fetch(`http://localhost:8080/personaje/${enemigoId}/ataques`)
    .then(function (res) { 
      if (res.ok) {
        res.json()
          .then(function ({ ataques }) {
              if (ataques.length === 5) {
                ataqueEnemigo = ataques 
                combate()
              }
          })
      }
    })
   
}

function seleccionarPersonjeEnemigo(){
    let nombreAleatorio = aleatorio(0, personajes.length -1)
    
    spanNombreEnemigo.innerHTML = personajes[nombreAleatorio].nombre           //clase 53
    ataquesPersonajeEnemigo = personajes[nombreAleatorio].ataques               //clase 57 
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueEnemigoA = aleatorio(0,ataquesPersonajeEnemigo.length -1)        // clase 57 

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

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
  clearInterval(intervalo)

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index)
      crearMensaje(" ¡EMPATE! 🤼")
    }
    else if ( ataqueJugador[index] === 'Mana' && ataqueEnemigo[index] === 'Diavlo' ) {
      indexAmbosOponentes(index, index)
        crearMensaje( "¡GANASTE! 🥳" )
        victoriasJugador++
        spanVidaJugador.innerHTML = victoriasJugador
    } 
    else if ( ataqueJugador[index] === 'No Magia' && ataqueEnemigo[index] === 'Mana' ) {
      indexAmbosOponentes(index, index)
        crearMensaje( "¡GANASTE! 🥳" )
        victoriasJugador++
        spanVidaJugador.innerHTML = victoriasJugador
    } 
    else if ( ataqueJugador[index] === 'Diavlo' && ataqueEnemigo[index] === 'No Magia' ) {
      indexAmbosOponentes(index, index)
        crearMensaje( "¡GANASTE! 🥳" )
        victoriasJugador++
        spanVidaJugador.innerHTML = victoriasJugador
    } 
    else {
      indexAmbosOponentes(index, index)
        crearMensaje( "PERDISTE... 😢" )
        victoriasEnemigo++
        spanVidaEnemigo.innerHTML = victoriasEnemigo
    }
  }
        revisarVidas()
}

function revisarVidas() {
   
   if (victoriasJugador === victoriasEnemigo){
     crearMensajeFinal(`WAT?? COMO VRGAS EMPATARON?`)
   }
    else if(vidaEnemigo > victoriasEnemigo){
        crearMensajeFinal("FELICIDADES PNCHE OTAKU . GANASTE")
    }
    else {
        crearMensajeFinal("BUA.. ALTO PERDEDOR")
    }
}

function crearMensaje(resultado) {
    
    let nAtaqueJugador = document.createElement('p')
    let nAtaqueEnemigo = document.createElement('p')

    seccionMensaje.innerHTML = resultado  
    nAtaqueJugador.innerHTML = indexAtaqueJugador
    nAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataqueDelJugador.appendChild(nAtaqueJugador)
    ataqueDelEnemigo.appendChild(nAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    seccionMensaje.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function pintarCanvas() {
  jugadorObjeto.x = jugadorObjeto.x + jugadorObjeto.velocidadX
  jugadorObjeto.y = jugadorObjeto.y + jugadorObjeto.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
  )
  jugadorObjeto.pintarPersonaje()

  enviarPosicion(jugadorObjeto.x, jugadorObjeto.y)

  personajesEnemigos.forEach(function (personaje) {
    personaje.pintarPersonaje()   
    revisarColision(personaje)

  })
  

}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/personaje/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  })

  .then(function (res) {                           //class79
    if (res.ok) {
      res.json()
        .then(function({ enemigos }) {
            console.log(enemigos)

            personajesEnemigos = enemigos.map(function (enemigo) {
                let personajeEnemigo = null 
                const personajeNombre = enemigo.personaje.nombre || ""
                if (personajeNombre === "Asta") {
                    personajeEnemigo = new personaje('Asta', './assets/Asta.png', 5, enemigo.id )
                }
                else if (personajeNombre === "Juno") {
                    personajeEnemigo = new personaje('Juno', './assets/Juno.png', 5, enemigo.id )
                }
                else if (personajeNombre === "Lucifero") {
                    personajeEnemigo = new personaje('Lucifero', './assets/Lucifero.png', 5, enemigo.id )
                }
                personajeEnemigo.x = enemigo.x
                personajeEnemigo.y = enemigo.y 

                return personajeEnemigo

            })

        })
    }
  })
}

function moverDerecha() {
  jugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
  jugadorObjeto.velocidadX = -5
}

function moverAbajo() {
  jugadorObjeto.velocidadY = 5
}

function moverArriba() {
  jugadorObjeto.velocidadY = - 5
}

function detenerMovimiento() {
  jugadorObjeto.velocidadX = 0
  jugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
   switch (event.key) {
     
     case 'ArrowUp':
       moverArriba()
       break
     case 'ArrowDown':
       moverAbajo()
       break
     case 'ArrowLeft':
       moverIzquierda()
       break
     case 'ArrowRight':
       moverDerecha()
       break
     default:
       break
         
   }
}

function iniciarMapa() {

  jugadorObjeto = obtenerObjetoPersonaje(guardarNombrePersonaje) 
  console.log(jugadorObjeto, guardarNombrePersonaje)
  intervalo = setInterval(pintarCanvas, 50)
  window.addEventListener("keydown", sePresionoUnaTecla)
  window.addEventListener("keyup", detenerMovimiento)
  
}

function obtenerObjetoPersonaje() {
  for (let i = 0; i < personajes.length; i++) {                    //clase 54-55
    if (guardarNombrePersonaje === personajes[i].nombre) {
        return personajes[i]
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x
  
  const arribaPersonaje = jugadorObjeto.y
  const abajoPersonaje = jugadorObjeto.y + jugadorObjeto.alto
  const derechaPersonaje = jugadorObjeto.x + jugadorObjeto.ancho
  const izquierdaPersonaje = jugadorObjeto.x
  
  if(
    abajoPersonaje < arribaEnemigo ||
    arribaPersonaje > abajoEnemigo ||
    derechaPersonaje < izquierdaEnemigo ||
    izquierdaPersonaje > derechaEnemigo
    ){
      return
    }
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id

    sectionSeleccionarAtaque.style.display = "flex"
    seleccionarPersonjeEnemigo(enemigo)
    //sectionVerMapa.style.display = `none`
    //alert(`hay colision` + enemigo.nombre)
}

window.addEventListener('load', iniciarJuego)