import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Persona, Nivel, Matricula, Anio} from '../../interfaces/gesaca';
import {PersonasService} from '../../services/personas.service';
import {NivelesService} from '../../services/niveles.service';
import {AniosService} from '../../services/anios.service';
import {Multidata} from '../../interfaces/multidata';
import {Singledata} from '../../interfaces/singledata';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatriculasService } from '../../services/matriculas.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss']
})
export class MatriculaComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  registerForm: FormGroup;
  submitted = false;

  alumno = {} as Persona;
  matricula = {} as Matricula;

  tituloModal: string;
  inputDni: string;

  editing = false;

  niveles = {} as Nivel;
  anios = {} as Anio;

  nombreAlumno: string;

  constructor(
    private  personasService: PersonasService,
    private matriculasService: MatriculasService,
    private  nivelesService: NivelesService,
    private aniosService: AniosService,
    private formBuilder: FormBuilder
    ) {  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.registerForm = this.formBuilder.group({
      IdPersona: [this.matricula.IdPersona, Validators.required],
      IdAnio: [this.matricula.IdAnio, Validators.required],
      IdNivel: [this.matricula.IdNivel, Validators.required],
      Grado: [this.matricula.Grado, Validators.required],
      Seccion: [this.matricula.Seccion, Validators.required],
      Nota: [this.matricula.Nota, Validators.required]
    });
  }

  buscarMatricula() {

    this.matriculasService.getByDni(this.inputDni).subscribe((data: Singledata) => {
      if (data.code_status == '1') {
        this.tituloModal = 'Alumno Matriculado';
        console.log(data);
        this.matricula = data.data as Matricula;
        this.nombreAlumno = this.getNombreAlumno(this.matricula.IdPersona);
        this.editing = true;
      } else {
        this.tituloModal = 'Alumno NO Matriculado';
        this.matricula = {} as Matricula;
        this.editing = false;
      }
      this.loadForm();
    }, (error) => {
      console.log(error);
      this.tituloModal = 'Alumno NO Matriculado';
      this.editing = false;
    });
    this.primaryModal.show();
  }

  getNombreAlumno  (id: number): string {
    this.personasService.getById(id).subscribe((data: Singledata) => {
      if (data.code_status == '1') {
        this.alumno =  data.data as Persona;
        return this.alumno.Nombre + ' ' + this.alumno.Materno + ' ' + this.alumno.Paterno;
      } else {
        return '';
      }
    }, (error) => {
      console.log(error);
     return '';
    });
    return '';
  }

  guardarMatricula() {

    if (this.editing) {
      this.matriculasService.put(this.matricula).subscribe((data: Singledata) => {
        if (data.code_status == '1') {
          console.log('Alumno Actualizado');
        } else {
          console.log('No se pudo guardar');
        }
      }, (error) => {
        console.log('No se pudo actualizar');
        console.log(error);
      });

    } else {

      this.matriculasService.save(this.matricula).subscribe((data: Singledata) => {
        if (data.code_status == '1') {
          console.log('Alumno guardado');
        } else {
          console.log('No se pudo guardar');
        }
      }, (error) => {
        console.log('No se pudo guardar');
        console.log(error);
      });
    }

    this.primaryModal.hide();
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.matricula = this.registerForm.value;
    console.log(this.matricula);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      // return;
      alert('FAIL!! :-)');
    } else {
      alert('SUCCESS!! :-)');
    }
  }
}
