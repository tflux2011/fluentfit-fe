import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
   imports: [RouterOutlet],
   template: `
   <div>
     <router-outlet/>
     </div>
  `,
  styles: ``
})
export class AuthLayoutComponent {

}
