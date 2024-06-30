import {Component, Renderer2, ElementRef } from '@angular/core';
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
  menuOpen = false;
  constructor(private renderer: Renderer2, private el: ElementRef) {}

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
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const headerElement = this.el.nativeElement.querySelector('header');
    if (this.menuOpen) {
      this.renderer.addClass(headerElement, 'header-expanded');
      this.renderer.addClass(headerElement.querySelector('.menu'), 'expanded');
    } else {
      this.renderer.removeClass(headerElement, 'header-expanded');
      this.renderer.removeClass(headerElement.querySelector('.menu'), 'expanded');
    }
  }
  cerrarSec(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('master');
    localStorage.removeItem('nombre');
  }

}
