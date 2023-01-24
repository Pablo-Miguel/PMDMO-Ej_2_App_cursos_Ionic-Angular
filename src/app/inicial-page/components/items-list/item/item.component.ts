import { Component, Input, OnInit } from '@angular/core';
import { Curso } from 'src/app/model/curso/curso';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {

  @Input() curso!: Curso;

  constructor() { }

  ngOnInit() {}

}
