import {Component} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token: string | null = null;
  master: string | null = null;
  title = 'clinica';
  nombre: string | null = null;

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.nombre = localStorage.getItem('nombre');
    } else {
      this.token = null;
    }
    if (localStorage.getItem('master') != null) {
      this.master = localStorage.getItem('master');
      this.nombre = localStorage.getItem('nombre');
    } else {
      this.master = null;
      this.nombre = localStorage.getItem('nombre');
    }

  }

  cerrarSec(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('master');
    localStorage.removeItem('nombre');
  }

}
