/**
 * true => X
 * false => 0
 */
(function() {

function $(selector) {
    return document.querySelector(selector);
}

function jugar(seleccionado) {
    if(true) {
        seleccionado.innerHTML = "X";
    }
    seleccionado.innerHTML = "O";
    
}

function definir_eventos() {
    var elements = document.querySelectorAll(".cat-element");

    for(var i = 0; i < elements.length; i++) {
        var element = elements[i];

        element.addEventListener("click", function(){
            //console.log(this.id);
            var position = this.id.split("-")[1];
            socket.play(position);
        });
    }

}

function build_cat() {
    for(var i = 0; i < 9; i++) {
        var item = build_item(i);

        $("#cat").innerHTML += item;
    }
    definir_eventos();
}

function build_item(i) {
    return "<div class='cat-element col-sm-4' id='elemento-"+i+"'></div>";
}

function convertir_figura(bandera) {
    if(bandera) {
        return "X";
    }
    return "O"; 
    
}

function reset() {
    
    var elements = document.querySelectorAll(".cat-element");
    for(var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = "";
    }
}

build_cat();

var socket = new Socket(function(figura) {
    var figura_string = convertir_figura(figura);
    //console.log(figura);
    Swal.fire(figura_string + " gano la partida");
},function(position, figura) {
    $("#elemento-"+position).innerHTML = convertir_figura(figura);
}, function() {
    Swal.fire("Alguien ingreso", "Reiniciando el tablero");
    reset();
}, function() {
    Swal.fire("No es tu turno", "Espera tu turno");
}, function(figura) {
    $("#message").innerHTML = "Juegas con la "+ figura;
    /*if(figura == "X") {
        $("#message").innerHTML += " <br> Es tu turno";
    }
    else {
        $("#message").innerHTML += " <br> No es tu turno";
    }*/
}/*, function() {
    Swal.fire("Empate", "Nadie gano");
}*/);

})();
