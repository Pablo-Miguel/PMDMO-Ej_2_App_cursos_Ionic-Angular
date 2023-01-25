import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPagePageRoutingModule } from './details-page-routing.module';

import { DetailsPagePage } from './details-page.page';
import { CardItemComponent } from './components/card-item/card-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPagePageRoutingModule
  ],
  declarations: [
    DetailsPagePage,
    CardItemComponent
  ]
})
export class DetailsPagePageModule {}
