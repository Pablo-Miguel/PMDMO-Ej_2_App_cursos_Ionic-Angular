import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Curso } from '../model/curso/curso';
import { ServicioService } from '../services/servicio/servicio.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.page.html',
  styleUrls: ['./details-page.page.scss'],
})
export class DetailsPagePage implements OnInit {

  curso!: Curso;

  constructor(public servicio: ServicioService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.curso = this.servicio.getCurso(params['id']);
    });
  }

}
