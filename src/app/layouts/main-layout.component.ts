import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer.component';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-main-layout',
   imports: [RouterOutlet, NavbarComponent, FooterComponent],
   template: `
   <div>
    <app-navbar />
     <router-outlet/>
     <app-footer />
     </div>
  `,
  styles: ``
})
export class MainLayoutComponent {

}
