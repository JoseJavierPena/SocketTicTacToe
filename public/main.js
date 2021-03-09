/**
 * true => X
 * falso => 0
 */
var juego = true;

function $(selector) {
    return document.querySelector(selector);
}

function jugar(seleccionado) {
    if(juego) {
        seleccionado.innerHTML = "X";
    }
    else {
        seleccionado.innerHTML = "O";
    }
}

function definir_eventos() {
    var elements = document.querySelectorAll(".cat-element");

    for(var i = 0; i < elements.length; i++) {
        var element = elements[i];

        element.addEventListener("click", function(){
            console.log("working?");
            jugar(this);
        });
    }

}

function build_cat() {
    for(var i = 0; i < 9; i++) {
        var item = build_item(i);

        $("#cat").innerHTML += item;
    }
}

function build_item(i) {
    return "<div class='cat-element col-sm-4' id='elemento-"+i+"'></div>";
}

build_cat();