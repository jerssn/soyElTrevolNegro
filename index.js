const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador{
    constructor(id){ 
        this.id = id
    }

    asignarPersonaje(personaje) {
        this.personaje = personaje
    }
}

class Personaje{
    constructor(nombre) {
        this.nombre = nombre 
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/personaje/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.personaje || ""
    const personaje = new Personaje(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarPersonaje(personaje)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()   
})

app.listen(8080, () => {
    console.log("servidor funcionando")
} )