import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Curso } from 'src/app/model/curso/curso';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async writeStorage(json: string) {
    await Filesystem.writeFile({
      path: 'storage/data.json',
      data: json,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };
  
  async readStorage(): Promise<Curso[]> {
    const contents = await Filesystem.readFile({
      path: 'storage/data.json',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  
    return new Promise((resolve, reject) => {
      let data = JSON.parse(contents.data);
      if(data == "") data = "[]";
      resolve(data);
    });
  };

}
