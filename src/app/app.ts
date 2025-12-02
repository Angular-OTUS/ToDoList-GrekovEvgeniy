import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastComponent } from "./components/toast-component/toast-component";
import { MainLayout } from "./components/main-layout/main-layout";

@Component({
  selector: 'app-root',
  imports: [ToastComponent, MainLayout],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
