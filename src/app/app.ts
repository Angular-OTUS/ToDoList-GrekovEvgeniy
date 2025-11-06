import { Component } from '@angular/core';
import { ToastComponent } from "./components/toast-component/toast-component";
import { RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ToastComponent, RouterOutlet ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
