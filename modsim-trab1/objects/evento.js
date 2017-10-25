"use strict";



class Evento {

    constructor(Tipo, Tempo, Entidade, Servidor) {
        this.Tipo = Tipo;
        this.Tempo = Tempo;
        this.Entidade = Entidade;
        this.Servidor = Servidor;
    }

    getTipo(){
        return this.Tipo;
    }

    getTempo(){
        return this.Tempo;
    }

    getEntidade() {
        return this.Entidade;
    }

    getServidor() {
        return this.Servidor;
    }

}