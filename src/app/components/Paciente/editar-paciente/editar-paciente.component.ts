import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Paciente} from 'src/app/models/paciente';
import {PacienteService} from 'src/app/services/paciente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {

  pacienteForm: FormGroup;
  titulo = 'Editar Paciente';
  id: string | null;
  token: string | null = null;
  master: string | null = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _pacienteService: PacienteService,
              private aRouter: ActivatedRoute) {
    this.pacienteForm = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', Validators.required],
      direccion: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
    if (localStorage.getItem('master') != null) {
      this.master = localStorage.getItem('master');
      
    } else {
      this.master = null;
    }
    this.seteoForm();
  }
  
  seteoForm() {
    if (this.id !== null) {
      this._pacienteService.obtenerPaciente(this.id).subscribe(data => {
        const fechaOriginal = new Date(data.fecha_nac);
        const fechaFormateada = new Date(fechaOriginal.getTime() - fechaOriginal.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
        this.pacienteForm.patchValue({
          dni: data.dni,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          mail: data.mail,
          direccion: data.direccion,
          password: data.password,
          fecha_nac: fechaFormateada,
        })
      })
    }
  }

  updatePaciente(id: any) {
    // Obtener la fecha desde el formulario
    const fechaNacForm = this.pacienteForm.get('fecha_nac')?.value;
  
    // Ajustar la fecha para evitar que se guarde con un día menos
    const fechaNacAjustada = new Date(fechaNacForm);
    fechaNacAjustada.setMinutes(fechaNacAjustada.getMinutes() + fechaNacAjustada.getTimezoneOffset());
  
    // Crear el objeto PACIENTE con la fecha ajustada
    const PACIENTE: Paciente = {
      dni: this.pacienteForm.get('dni')?.value,
      nombre: this.pacienteForm.get('nombre')?.value,
      apellido: this.pacienteForm.get('apellido')?.value,
      telefono: this.pacienteForm.get('telefono')?.value,
      mail: this.pacienteForm.get('mail')?.value,
      direccion: this.pacienteForm.get('direccion')?.value,
      fecha_nac: fechaNacAjustada, // No convertir a cadena, mantenlo como Date
      password: this.pacienteForm.get('password')?.value,
    };
  
    // Llamada al servicio para actualizar el paciente
    this._pacienteService.updatePaciente(id, PACIENTE).subscribe(data => {
      this.toastr.success('El paciente fue actualizado con éxito!', 'Paciente Registrado!');
      this.router.navigate(['/list-paciente']);
    }, error => {
      console.log(error);
      this.pacienteForm.reset();
    });
  }


}
