import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicialPagePageRoutingModule } from './inicial-page-routing.module';

import { InicialPagePage } from './inicial-page.page';
import { FormularyComponent } from './components/formulary/formulary.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemComponent } from './components/items-list/item/item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InicialPagePageRoutingModule
  ],
  declarations: [
    InicialPagePage,
    FormularyComponent,
    ItemsListComponent,
    ItemComponent
  ]
})
export class InicialPagePageModule {}
