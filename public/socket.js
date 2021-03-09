function Socket(gano, nueva_jugada, restart, no_te_toca, conexion/*, empate*/) {

    var juego = true;
    var socket = io();
    var self = this;

    self.play = function(position) {
        socket.emit("nuevo_movimiento", {position:position});
        
    }

    self.figura = function() {
        if(self.juego){
            return "X";
        }
        return "O";
    }

    socket.on("connect", function(){
        socket.on("init", function(data) {
            //console.log(data);
            self.juego = data.figura;
            conexion(self.figura());
        });

        socket.on("reset", function() {
            restart();
        });

        socket.on("Won", function(data) {
            var figura = data.figura;
            gano(figura);
        });

        // socket.on("empate", function(data) {
        //     empate();
        // });

        socket.on("no_te_toca", function(data) {
            no_te_toca();
        });

        socket.on("alguien_tiro", function(data) {
            nueva_jugada(data.position, data.figura);
        });
    });
}