//MOMENTANEO

//document.getElementById("inicio").style.display = "none"
document.getElementById("jugadores").style.display = "none"
document.getElementById("elegirRoles").style.display = "none"
document.getElementById("comienzaPartida").style.display = "none"





document.getElementById("jugadores").style.display = "none"


function comenzar(){
    document.getElementById("inicio").style.display = "none"
    document.getElementById("jugadores").style.display = "flex";
}

let nombres = JSON.parse(localStorage.getItem("nombres")) || [];

mostrarNombres();


function agregarJugador() {

    let texto = document.getElementById("nombre").value;

    nombres.push({
        nombre: texto,
        rol: null,
        descripcion:"",
    });

    localStorage.setItem("nombres", JSON.stringify(nombres));

    mostrarNombres();

}


function mostrarNombres() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    for(let i = 0; i < nombres.length; i++) {

        lista.innerHTML += `
        
            <div class="jugador">

                <p>
                    ${nombres[i].nombre}
                    
                </p>

                <button onclick="borrarNombre(${i})">
                    Borrar
                </button>

            </div>

        `;
    }
}


function borrarNombre(indice) {

    nombres.splice(indice, 1);

    localStorage.setItem("nombres", JSON.stringify(nombres));

    mostrarNombres();

}



function roles(){
    document.getElementById("jugadores").style.display = "none"
    document.getElementById("cantidadJugadores").innerHTML =
    "JUGADORES: " + nombres.length;
    document.getElementById("elegirRoles").style.display = "flex"
}


///-----------------------SELCCION ROLES-------------------------///

let rolesEnPartida = {
    villager: [],
    vidente: [],
    doctor: [],
    rencoroso: [],
    bruja: [],
    apVidente: [],
    sacerdote: [],
    guardaEspaldas: [],
    ninioTravieso: [],
    abuela: [],
    borracho: [],
    pistolero: [],
    ballestero: [],
    escabador: [],
    buffon: [],
    medium: [],
    alcalde: [],
    prostituta: []
}


function agregarRol(rol){

    let nuevoRol = crearRol(rol);

    rolesEnPartida[rol].push(nuevoRol);

    document.getElementById(rol).innerHTML =
        rolesEnPartida[rol].length;
}

function eliminarRol(rol){

    rolesEnPartida[rol].pop();

    document.getElementById(rol).innerHTML =
        rolesEnPartida[rol].length;
}

function crearPartida(){

    let listaRoles = [];

    for(let rol in rolesEnPartida){

        for(let i = 0; i < rolesEnPartida[rol].length; i++){

            listaRoles.push(
                rolesEnPartida[rol][i]
            );

        }

    }

    listaRoles.sort(() => Math.random() - 0.5);

    for(let i = 0; i < nombres.length; i++){

        nombres[i].rol = listaRoles[i];

        
    }
    document.getElementById("elegirRoles").style.display = "none"
    document.getElementById("comienzaPartida").style.display = "flex"

 comenzarPartida();

}



///----------------------------ROLES----------------------------///

class Jugador {
    constructor(nombre, rol) {
        this.nombre = nombre;
        this.rol = rol;

        this.vivo = true;

        this.protegido = false;
        this.silenciado = false;
        this.envenenado = false;

        this.votos = 1;

        this.revelado = false;

        this.casa = null;

        this.habilidadUsada = false;
    }
}

class Rol {

    constructor(nombre, equipo,descripcion) {
        this.nombre = nombre;
        this.equipo = equipo;
        this.descripcion= descripcion
    }

    accionNoche(usuario) {}
    accionDia(usuario, objetivo, partida) {}
    alMorir(usuario, partida) {}
}

class Villager extends Rol {

    constructor() {
        super("Villager", "aldea","No hace nada el loco");
    }

    accionNoche(usuario){
        document.getElementById("acciones").innerHTML = `
            <p>
                Los aldeanos se van a dormir, No tienes acciones nocturnas.
            </p>

        `;
    }

}
class Vidente extends Rol {

    constructor() {
        super(
            "Vidente",
            "aldea",
            "Mira el rol de un jugador"
        );
    }

    accionNoche(usuario){

        let opciones = "";

        for(let jugador of nombres){

            if(jugador.nombre != usuario.nombre){

                opciones += `
                
                    <option value="${jugador.nombre}">
                        ${jugador.nombre}
                    </option>

                `;
            }
        }

        document.getElementById("acciones").innerHTML = `
        
            <p>
                Elije a quien revelaras el rol
            </p>

            <select id="objetivoVidente">

                ${opciones}

            </select>

            <button onclick="confirmarVidente()">
                Revelar
            </button>

        `;
    }

}

function confirmarVidente(){

    let nombreObjetivo =
    document.getElementById("objetivoVidente").value;

    let jugadorObjetivo =
    nombres.find(j =>
        j.nombre == nombreObjetivo
    );

    document.getElementById("acciones").innerHTML = `
    
        <p>
            ${jugadorObjetivo.nombre}
            es
            ${jugadorObjetivo.rol.nombre}
        </p>

    `;
}



class Doctor extends Rol {

    constructor() {
        super("Doctor", "aldea","Proteje a alguien");
    }

}
class Rencoroso extends Rol {

    constructor() {
        super("Rencoroso", "aldea","Cuando muere se lleva a uno con el");
    }

}
class Bruja extends Rol {

    constructor() {
        super("Bruja", "aldea","Tiene 2 pociones, una salva a alguien si va a ser asesinado otra envenena a alguien");
    }

}
class ApVidente extends Rol {

    constructor() {
        super("ApVidente", "aldea","Si muere el vidente, toma su lugar");
    }

}
class GuardaEspaldas extends Rol {

    constructor() {
        super("GuardaEspaldas", "aldea","Protejes a alguien, tu mueres en su lugar");
    }

}
class NinioTravieso extends Rol {

    constructor() {
        super("NinioTravieso", "aldea","Puedes intercambiar el rol de 2 personas");
    }

}
class Sacerdote extends Rol {

    constructor() {
        super("Sacerdote", "aldea","tira agua bendita, si es un lobo lo matas, si no, mueres");
    }

}
class Prostituta extends Rol {

    constructor() {
        super("Prostituta", "aldea","Duermes en casa de otra persona, si esta muere tu tambien, si te atacan y estas en otra casa sobrevives");
    }

}
class Abuela extends Rol {

    constructor() {
        super("Abuela", "aldea","Seleccionas a alguien para que no pueda votar");
    }

}
class Borracho extends Rol {

    constructor() {
        super("Borracho", "aldea","ESTAS BORRACHO, NO PUEDES HABLAR NUNCA");
    }

}
class Pistolero extends Rol {

    constructor() {
        super("Pistolero", "aldea","Tienes 2 balas, tras disparar a alguien, revelas tu rol");
    }

}
class Ballestero extends Rol {

    constructor() {
        super("Ballestero", "aldea","Tienes 2 flechas, si disparas a un aldeano, mueres");
    }

}
class Escabador extends Rol {

    constructor() {
        super("Escabador", "aldea","Eliges alguien para cuando muera, tomar su rol");
    }

}
class Buffon extends Rol {

    constructor() {
        super("Buffon", "aldea","Ganas si te echan");
    }

}
class Medium extends Rol {

    constructor() {
        super("Medium", "aldea","Puedes revivir una persona");
    }

}
class Alcalde extends Rol {

    constructor() {
        super("Alcalde", "aldea","Revela tu rol, tus votos valen doble");
    }

}

function crearRol(nombreRol){

    switch(nombreRol){

        case "villager":
            return new Villager();

        case "vidente":
            return new Vidente();

        case "doctor":
            return new Doctor();

        case "rencoroso":
            return new Rencoroso();

        case "bruja":
            return new Bruja();

        case "apVidente":
            return new ApVidente();

        case "guardaEspaldas":
            return new GuardaEspaldas();

        case "ninioTravieso":
            return new NinioTravieso();

        case "prostituta":
            return new Prostituta();

        case "abuela":
            return new Abuela();

        case "sacerdote":
            return new Sacerdote();

        case "borracho":
            return new Borracho();

        case "pistolero":
            return new Pistolero();

        case "ballestero":
            return new Ballestero();

        case "escabador":
            return new Escabador();

        case "buffon":
            return new Buffon();

        case "medium":
            return new Medium();

        case "alcalde":
            return new Alcalde();

        default:
            console.log("Rol no encontrado");
            return null;
    }
}








//-------------------PARTIDA------------------//


let indiceJugador = 0;


function comenzarPartida(){

    indiceJugador = 0;

    mostrarJugador();

}


function mostrarJugador(){

    if(indiceJugador >= nombres.length){

        document.getElementById("nombreJugador").innerHTML =
        "Todos los roles fueron mostrados";

        document.getElementById("botonPrincipal").style.display =
        "none";

        return;
    }

    document.getElementById("nombreJugador").innerHTML =

        "JUGADOR: " +
        nombres[indiceJugador].nombre;


    document.getElementById("botonPrincipal").innerHTML =
    "Ver Rol";

    document.getElementById("botonPrincipal").onclick =
    detalleJugador;

}


function detalleJugador(){

    document.getElementById("nombreJugador").innerHTML =

        "JUGADOR: " +
        nombres[indiceJugador].nombre +
        "ROL: " +
        nombres[indiceJugador].rol.nombre +
        "DESCRIPCION: "+
        nombres[indiceJugador].rol.descripcion;

        nombres[indiceJugador].rol.accionNoche(
    nombres[indiceJugador]
);


    document.getElementById("botonPrincipal").innerHTML =
    "Siguiente Jugador";

    document.getElementById("botonPrincipal").onclick =
    siguienteJugador;
}


function siguienteJugador(){
    document.getElementById("acciones").innerHTML = ``
            
    indiceJugador++;

    mostrarJugador();

}




















