import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/model/curso/curso';
import { ServicioService } from 'src/app/services/servicio/servicio.service';

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {

  cursos!: Curso[];

  constructor(public servicio: ServicioService) {
  }

  ngOnInit() {
    
    this.servicio.getCursos$().subscribe((c => {
      this.cursos = c;
    }));
    
  }

}
