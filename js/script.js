var palabraRandom = ["HARDWARE", "SOFTWARE", "HTML", "JAVASCRIPT", "CSS", "FUNCION", "CLASS", "BOTON", "INPUT", "LABEL"];

var palabraSecreta ;
var letrasPalabraSecreta;
var intentosRestantes;
var intentosRestantesHTML = document.querySelector(".intentos-restantes");
var palabraNueva = document.querySelector(".input-palabras");
var filtro;

var camposPalabra;
var campoLetra;

var teclaPresionada = document.querySelector("html");
var pizarra = document.querySelector(".pizarra-acciones");
var instrucciones = document.querySelector(".instrucciones");
var botonesInicio = document.querySelector(".botones-inicio");
var botonesPalabra = document.querySelector(".nuevas-palabras");
var botonIniciar = document.getElementById("btn-iniciar");
var botonNuevaPalabra = document.getElementById("btn-agregar");
var botonAgregarPalabra = document.getElementById("btn-palabra");
var botonVolver = document.getElementById("btn-volver");
var botonesJuego = document.querySelector(".botones-juego");
var botonJugar = document.querySelector(".btn-jugar");
var botonRendirse = document.querySelector(".btn-rendirse");
var letrasTeclado = document.querySelector("#lista-letras").childNodes;

botonIniciar.addEventListener("click", function () {
    acciones();
    limpiarPantalla();
    dibujarBaseHorca();
    habilitar();
    botonesInicio.style.display = "none";
    instrucciones.style.display = "none";
    pizarra.style.display = "block";
    document.getElementById("lista-letras").style.display = "block";
});

botonJugar.addEventListener('click', function () {
    acciones();
    limpiarPantalla();
    dibujarBaseHorca();
    habilitar();
});

botonRendirse.addEventListener("click", function () {
    botonesInicio.style.display = "block";
    pizarra.style.display = "none";
    instrucciones.style.display = "block";
});

botonNuevaPalabra.addEventListener("click", function () {
    botonesInicio.style.display = "none";
    instrucciones.style.display = "none";
    botonesPalabra.style.display = "block";
});

botonAgregarPalabra.onclick = (event) => {
    event.preventDefault();
    palabraRandom.push(palabra.value);
    input.reset();
    console.log(palabraRandom)
    console.log(palabraNueva)
};

botonVolver.addEventListener("click", function () {
    botonesInicio.style.display = "block";
    instrucciones.style.display = "block";
    botonesPalabra.style.display = "none";

});

teclaPresionada.addEventListener("keydown", function (event) {
    var key = event.key.toUpperCase();
    if (filtro.includes(key)) {
        introducirLetras(key);
        filtro = filtro.replace(key, '');
    }
});

function acciones() {
    palabraSecreta = palabraRandom[Math.floor(Math.random() * palabraRandom.length)];
    letrasPalabraSecreta = 0;
    intentosRestantes = 8;
    intentosRestantesHTML.innerHTML = "Intentos restantes: " + intentosRestantes;
    camposPalabra = document.querySelector(".palabra");
    document.getElementById("avisos").style.color = "yellow";

    while (camposPalabra.firstChild) {
        camposPalabra.removeChild(camposPalabra.lastChild);
    }

    for (var i = 0; i < palabraSecreta.length; i++) {
        campoLetra = document.createElement("input");
        campoLetra.classList.add("campo-letras");
        camposPalabra.appendChild(campoLetra);
    }
}

function introducirLetras(key) {
    if (palabraSecreta.includes(key)) {
        var idLetraCorrecta = "#" + key;
        var keyLetra = document.querySelector(idLetraCorrecta);

        for (var i = 0; i < palabraSecreta.length; i++) {
            if (key == palabraSecreta[i]) {
                letrasPalabraSecreta++;
                camposPalabra.childNodes[i].value = palabraSecreta[i];
                keyLetra.classList.replace("letra", "letra-correcta");
            }
            if (letrasPalabraSecreta == palabraSecreta.length) {
                for (var i = 0; i < palabraSecreta.length; i++) {
                    camposPalabra.childNodes[i].value = palabraSecreta[i];
                    camposPalabra.childNodes[i].classList.replace("campo-letras", "palabra-ahorcado-bien");
                    intentosRestantesHTML.innerHTML = "HAS GANADO";
                    document.getElementById("avisos").style.color = "green";
                    limpiarPantalla();
                    dibujarSalvado();
                    filtro = "";
                }
            }
        }
    } else {
        intentosRestantes--;
        intentosRestantesHTML.innerHTML = "Intentos restantes: " + intentosRestantes;
        var idLetraIncorrecta = "#" + key;
        var keyword = document.querySelector(idLetraIncorrecta);

        for (var i = 0; i < palabraSecreta.length; i++) {
            if (key != palabraSecreta[i]) {
                keyword.classList.replace("letra", "letra-incorrecta");
                dibujarCanvas(intentosRestantes);
            }
        }
        if (intentosRestantes == 0) {
            mostrarPalabraSecreta();
            intentosRestantesHTML.innerHTML = "HAS PERDIDO";
            document.getElementById("avisos").style.color = "red";
            filtro = "";
        }
    }
}

function mostrarPalabraSecreta() {
    for (var i = 0; i < palabraSecreta.length; i++) {
        camposPalabra.childNodes[i].value = palabraSecreta[i];
        camposPalabra.childNodes[i].classList.replace("campo-letras", "palabra-ahorcado-mal");
    }
}

function habilitar() {
    filtro = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    letrasTeclado.forEach(element => {
        element.className = "letra";
    });
}

function inhabilitar() {
    filtro = "";
}