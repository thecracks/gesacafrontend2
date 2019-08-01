import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatriculaComponent} from './matricula.component';
import {InscripcionComponent} from './inscripcion.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Matrículas'
    },
    children: [
      {
        path: '',
        redirectTo: 'matricula'
      },
      {
        path: 'matricula',
        component: MatriculaComponent,
        data: {
          title: 'Matricula'
        }
      },
      {
        path: 'inscripcion',
        component: InscripcionComponent,
        data: {
          title: 'Inscripción'
        }
      }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculaRoutingModule { }
