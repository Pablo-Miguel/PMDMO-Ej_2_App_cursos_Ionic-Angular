import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Curso } from 'src/app/model/curso/curso';

type CursoJson = {
  id: String,
  curso: String,
  puntos: Number,
  src: String
} 

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async writeStorage(cursos: Curso[]) {
    let json = JSON.stringify(cursos);
    await Filesystem.writeFile({
      path: 'storage/data.json',
      data: json,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  };
  
  async readStorage(): Promise<CursoJson[]> {
    const contents = await Filesystem.readFile({
      path: 'storage/data.json',
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });

    let data = JSON.parse(contents.data);
    if(!data) data = "[]";
    
    return data;
  };

}
