import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Persona, Nivel, Matricula, Anio } from '../../interfaces/gesaca';
import { PersonasService } from '../../services/personas.service';
import { NivelesService } from '../../services/niveles.service';
import { AniosService } from '../../services/anios.service';
import { Multidata } from '../../interfaces/multidata';
import { Singledata } from '../../interfaces/singledata';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatriculasService } from '../../services/matriculas.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss']
})
export class MatriculaComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChild('mensajeModal') public mensajeModal: ModalDirective;

  registerForm: FormGroup;
  submitted = false;

  alumno = {} as Persona;
  matricula = {} as Matricula;

  tituloModal: string;
  msgModal: string;
  inputDni: string;

  editing = false;

  nivel = {} as Nivel;
  anio = {} as Anio;

  niveles: Nivel[];
  anios: Anio[];

  nombreAlumno: string;

  constructor(
    private personasService: PersonasService,
    private matriculasService: MatriculasService,
    private nivelesService: NivelesService,
    private aniosService: AniosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAnios();
    this.getNiveles();
    this.loadForm();
  }

  loadForm() {
    this.registerForm = this.formBuilder.group({
      IdPersona: [this.matricula.IdPersona, Validators.required],
      IdAnio: [this.matricula.IdAnio, Validators.required],
      IdNivel: [this.matricula.IdNivel, Validators.required],
      Grado: [this.matricula.Grado, Validators.required],
      Seccion: [this.matricula.Seccion, Validators.required],
      Nota: [this.matricula.Nota, Validators.required],
      NombreAlumno: [this.nombreAlumno]
    });
  }

  getNiveles() {
    this.nivelesService.get().subscribe((data: Multidata) => {
      if (data.code_status == '1') {
        this.niveles = data.data as Nivel[];
      }
    }, (error) => {
      console.log(error);
    });
  }

  getAnios() {
    this.aniosService.get().subscribe((data: Multidata) => {
      if (data.code_status == '1') {
        this.anios = data.data as Anio[];
      }
    }, (error) => {
      console.log(error);
    });
  }

  buscarMatricula() {
    this.matriculasService.getByDni(this.inputDni).subscribe((data: Singledata) => {
      if (data.code_status == '1') {
        this.tituloModal = 'Alumno Matriculado';
        this.matricula = data.data[0] as Matricula;
        this.getNombreAlumno(this.matricula.IdPersona);
        this.editing = true;
        this.loadForm();
        this.primaryModal.show();
      } else {

        this.personasService.getByDni(this.inputDni).subscribe((data: Singledata) => {
          if (data.code_status == '1') {
            this.tituloModal = 'Alumno NO Matriculado';
            this.matricula = {} as Matricula;
            this.editing = false;
            this.loadForm();
            this.primaryModal.show();
          } else {
            this.tituloModal = 'Alumno NO Encontrado';
            this.msgModal = 'Deseas ir a la seccion de registro de alumnos?';
            this.mensajeModal.show();
          }

        }, (error) => {
          console.log(error);
          this.tituloModal = 'Alumno NO Matriculado';
          this.editing = false;
        });
      }
    }, (error) => {
      console.log(error);
      this.tituloModal = 'Alumno NO Matriculado';
      this.editing = false;
    });

    // this.primaryModal.show();
  }

  getNombreAlumno(id: number) {
    this.personasService.getById(id).subscribe((data: Singledata) => {
      if (data.code_status == '1') {
        this.alumno = data.data as Persona;
        this.nombreAlumno = this.alumno.Nombre + ' ' + this.alumno.Materno + ' ' + this.alumno.Paterno;
      } else {
        this.nombreAlumno = '';
      }
    }, (error) => {
      console.log(error);
      this.nombreAlumno = '';
    });
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
          console.log('Matricula guardado');
        } else {
          console.log('Matricula no se pudo guardar');
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

  cambioNivel(e) {
    console.log(e);
    alert('cambiando combo');
  }

  goInscripcion() {
    this.router.navigate(['matricula/inscripcion']);
  }
}
