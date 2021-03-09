var express = require("express");
var socket_io = require("socket.io");
var evaluator = require("./evaluator");

var app = express();
var io = socket_io();

var posiciones_ocupada = {};
var turno = true;
var figura = true;

app.io = io;

io.on("connection", function(socket) {
    //console.log(evaluator([2,5,2]));
    console.log("Se conecto un nuevo cliente");

    posiciones_ocupada = {};
    socket.broadcast.emit("reset", {});

    /**  */
    socket.emit("init", {figura:figura});
    socket.figura = figura;
    socket.user_board = [];

    figura = !figura;

    socket.on("nuevo_movimiento", function(data){
        //console.log(data);
        if(!posiciones_ocupada[data.position]) {

            // Evaluar turno
            if(turno == socket.figura){
                // Agregamos el movimiento al tablero
            socket.user_board.push(parseInt(data.position));

            // Marcamos la posicion pcupada y enviamos el movimiento
            posiciones_ocupada[data.position] = true;
            io.emit("alguien_tiro", {position: data.position, figura: socket.figura});

            // Evaluamos si usuario gano
            var evaluacion_tablero = evaluator(socket.user_board);
            console.log("Resultado " + evaluacion_tablero + " tablero: " + socket.user_board);
            if(evaluacion_tablero) {
                console.log("Alguien gano");
                io.emit("Won", {figura:socket.figura})
            }
            turno = !turno;
            }
            else {
                socket.emit("no_te_toca", {});

            }

        }        
        else {
            console.log("Alguien tiro en una posicion ocupada");
        }
    });
});

module.exports = app;