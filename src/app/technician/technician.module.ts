import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicianComponent } from './technician.component';
import { TechnicianRoutingModule } from './technician-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    AppMaterialModule,
    SharedModule
  ],
  declarations: [TechnicianComponent]
})
export class TechnicianModule { }
