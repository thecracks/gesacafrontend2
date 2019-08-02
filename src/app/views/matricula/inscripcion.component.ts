import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Persona, Nivel} from '../../interfaces/gesaca';
import {PersonasService} from '../../services/personas.service';
import {NivelesService} from '../../services/niveles.service';
import {Multidata} from '../../interfaces/multidata';
import {Singledata} from '../../interfaces/singledata';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  registerForm: FormGroup;
  submitted = false;

  persona = {} as Persona;
  tituloModal: string;
  inputDni: string;

  editing = false;

  constructor(private  personasService: PersonasService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    /*    this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
        });*/

    this.loadForm();
  }

  loadForm() {
    this.registerForm = this.formBuilder.group({
      Dni: [this.persona.Dni, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      Nombre: [this.persona.Nombre, Validators.required],
      Paterno: [this.persona.Paterno, Validators.required],
      Materno: [this.persona.Materno, Validators.required],
      Telefono: [this.persona.Telefono, Validators.required]
    });
  }

  buscarAlumno() {

    this.personasService.getByDni(this.inputDni).subscribe((data: Singledata) => {

      if (data.code_status == '1') {
        this.tituloModal = 'Alumno Encontrado';
        console.log(data);
        this.persona = data.data as Persona;
        this.editing = true;
      } else {
        this.tituloModal = 'Alumno NO Encontrado';
        this.persona = {} as Persona;
        this.persona.Dni = this.inputDni;
        this.editing = false;

      }

      console.log(this.persona.Dni);
      this.loadForm();
    }, (error) => {
      console.log(error);
      this.tituloModal = 'Alumno NO Encontrado';
      this.editing = false;

    });


    this.primaryModal.show();
  }

  guardarAlumno() {

    console.log(this.persona);

    if (this.editing) {
      this.personasService.put(this.persona).subscribe((data: Singledata) => {
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

      this.personasService.save(this.persona).subscribe((data: Singledata) => {
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

    this.persona = this.registerForm.value;
    console.log(this.persona);
   
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      // return;
      alert('FAIL!! :-)');
    } else {

      this.persona.Tipo=1;
      this.persona.Sub=1;

      this.guardarAlumno();
      alert('SUCCESS!! :-)');
    }


  }

  

}
