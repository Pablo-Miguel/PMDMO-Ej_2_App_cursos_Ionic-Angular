import { v4 as uuid } from 'uuid';

export class Curso {
    id: String;

    constructor(private curso: String, private puntos: Number, private src: String){
        this.id = uuid();
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
