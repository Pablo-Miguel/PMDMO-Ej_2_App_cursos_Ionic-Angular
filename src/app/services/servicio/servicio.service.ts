import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from 'src/app/model/curso/curso';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private cursos!: Curso[];
  private cursos$!: BehaviorSubject<Curso[]>;

  constructor(private storage: StorageService) {
    
    this.obtenerDataJson();
    
    this.cursos$ = new BehaviorSubject<Curso[]>(this.cursos);
  }

  private async obtenerDataJson(){
    await this.storage.readStorage()
    .then(parsedJSON => {
      this.cursos = parsedJSON;
    })
    .catch(err => {
      this.cursos = [];
    });
  }

  getCursos$(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }

  getCurso(id: String): Curso {
    return this.cursos.filter(x => x.getId() == id)[0];
  }

  anyadirCursoPrimero(curso: String, puntos: Number, src: String) {
    this.cursos.unshift(new Curso(curso, puntos, src));
    this.storage.writeStorage(JSON.stringify(this.cursos));
    this.cursos$.next([...this.cursos]);
  }

  eliminarCurso(curso: Curso) {
    this.cursos = this.cursos.filter(x => x.getId() != curso.getId());
    this.storage.writeStorage(JSON.stringify(this.cursos));
    this.cursos$.next([...this.cursos]);
  }
}
