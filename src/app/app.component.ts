import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonApp, IonSplitPane, IonRouterOutlet} from '@ionic/angular/standalone';
import { MenuComponent } from './comps/menu/menu.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [ CommonModule, IonApp, IonSplitPane, IonRouterOutlet,MenuComponent],
})
export class AppComponent {

  
  constructor() {
   
  }
}
