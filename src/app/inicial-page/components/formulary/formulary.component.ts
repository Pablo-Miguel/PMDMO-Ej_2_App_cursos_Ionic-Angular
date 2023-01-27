import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'formulary',
  templateUrl: './formulary.component.html',
  styleUrls: ['./formulary.component.scss'],
})
export class FormularyComponent implements OnInit {

  frmCursos!: FormGroup;
  curso!: FormControl;
  puntos!: FormControl;

  src: String;

  constructor(private alertController: AlertController, private servicio: ServicioService) {
    this.src = "https://ionicframework.com/docs/img/demos/card-media.png";
  }
  
  ngOnInit() {
    this.curso = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]);
    this.puntos = new FormControl('', [
      Validators.required, 
      Validators.pattern(/^-?(0|[1-9]\d*)?$/), 
      Validators.min(0), 
      Validators.max(10)
    ]);
    
    this.frmCursos = new FormGroup({
      curso: this.curso,
      puntos: this.puntos
    });
  }

  async presentAlert() {

    let errors = "";

    if(this.curso.hasError('required')) errors += "- Curso: Requerido <br />";
    if(this.curso.hasError('minlength')) errors += "- Curso: Min 3 caracteres <br />";
    if(this.puntos.hasError('required')) errors += "- Puntos: Requerido <br />";
    if(this.puntos.hasError('pattern')) errors += "- Puntos: Numero entre 0 y 10 <br />";
    if(this.puntos.hasError('min')) errors += "- Puntos: Min valor es 0 <br />";
    if(this.puntos.hasError('max')) errors += "- Puntos: Max valor es 10 <br />";

    const alert = await this.alertController.create({
      header: 'Datos invalidos',
      message: errors,
      buttons: ['OK'],
    });

    await alert.present();
  }

  private async readPicture(path: string){
    let file = await Filesystem.readFile({
      directory: Directory.Data,
      path: path
    })

    let data = `data:image/png;base64,${file.data}`;
    this.src = data;
  }

  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
  
    const fileName = new Date().getTime() + '.png';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    this.readPicture(fileName);

    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  async takePicture(useCamera: Boolean) {

    let source: CameraSource
    if(useCamera) source = CameraSource.Camera
    else source = CameraSource.Photos

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: source,
      quality: 100
    });
    await this.savePicture(capturedPhoto);
  };

  addCurso(){
    if(this.frmCursos.valid){

      this.servicio.anyadirCursoPrimero(this.curso.value, this.puntos.value, this.src);
      this.frmCursos.reset();
      this.src = "https://ionicframework.com/docs/img/demos/card-media.png";

    } else this.presentAlert();
  }

}
