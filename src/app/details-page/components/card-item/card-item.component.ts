import { Component, Input, OnInit, Output } from '@angular/core';
import { Curso } from 'src/app/model/curso/curso';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {

  @Input() curso!: Curso;

  constructor(public servicio: ServicioService) {
  }

  ngOnInit() {}

}
