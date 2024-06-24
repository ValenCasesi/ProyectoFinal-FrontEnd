import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ObraSocial} from "../../../models/obraSocial";
import {ObraSocialService} from "../../../services/obra-social.service";
import {__importDefault} from "tslib";

@Component({
  selector: 'app-create-os',
  templateUrl: './create-os.component.html',
  styleUrls: ['./create-os.component.css']
})
export class CreateOSComponent implements OnInit {
  OSForm: FormGroup;

  titulo= 'Crete OS';
  _id: String | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _osService: ObraSocialService,
              private aRouter: ActivatedRoute) {
  this.OSForm=this.fb.group({
    nombre: ['', Validators.required],
    imgURL: ['', Validators.required]

  })
    this._id=this.aRouter.snapshot.paramMap.get('id');
  }

 /* const os: ObraSocial={
    nombre: this.OSForm.get('nombre')?.value,
  };*/

  ngOnInit(): void {
    this.isEdit();
  }


  createOS(OSForm: NgForm){
     const os: ObraSocial={
        nombre: this.OSForm.get('nombre')?.value,
        imgURL : this.OSForm.get('imgURL')?.value
    };
    console.log(os)
    this._osService.createOS(os).subscribe(
      res => {
        console.log(res);
    this.toastr.success('Obra Social agregada correctamente!', 'OS agregada!')
        this.router.navigate(['/list-os'])
    }, error => {
        console.log(error);
        this.OSForm.reset();
      })
  }

  isEdit(){
    if (this._id!==null){
      this.titulo= 'Edit OS';
      this._osService.getOS(this._id).subscribe(
        data=>{
          this.OSForm.setValue({
              nombre: data.nombre,
              imgURL: data.imgURL
            }
          )
        }
      )
    }
  }

  updateOS(id: any) {
    const os: ObraSocial = {
      nombre: this.OSForm.get('nombre')?.value,
      imgURL: this.OSForm.get('imgURL')?.value
    }
    this._osService.updateOS(id, os).subscribe( res=> {
      this.toastr.success('Obra social actualizada correctamente!', 'OS Actualizada!')
      this.router.navigate(['/list-os'])
    }, error => {
      console.log(error);
      this.OSForm.reset();
    })
  }
}