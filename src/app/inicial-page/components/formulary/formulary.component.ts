import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ServicioService } from 'src/app/services/servicio/servicio.service';

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

  async takePicture(useCamera: Boolean) {

    let source: CameraSource
    if(useCamera) source = CameraSource.Camera
    else source = CameraSource.Photos

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: source,
      quality: 100
    });

    if(capturedPhoto.webPath) this.src = capturedPhoto.webPath!;
    console.log(this.src);
  };

  addCurso(){
    if(this.frmCursos.valid){

      this.servicio.anyadirCursoPrimero(this.curso.value, this.puntos.value, this.src);
      this.frmCursos.reset();

    } else this.presentAlert();
  }

}
