import { v4 as uuid } from 'uuid';

export class Curso {
    constructor(private id: String, private curso: String, private puntos: Number, private src: String){
        if(!id) this.id = uuid();
    }
    
    getId(): String {
        return this.id;
    }

    getCurso(): String {
        return this.curso;
    }

    setCurso(value: String){
        this.curso = value;
    }

    getPuntos(): Number {
        return this.puntos;
    }

    setPuntos(value: Number){
        this.puntos = value;
    }

    getSrc(): String {
        return this.src;
    }

    setSrc(value: String){
        this.src = value;
    }
}
