import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatriculaRoutingModule } from './matricula-routing.module';
import { MatriculaComponent } from './matricula.component';
import { InscripcionComponent } from './inscripcion.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [MatriculaComponent, InscripcionComponent],
  imports: [
    CommonModule,
    MatriculaRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class MatriculaModule { }
