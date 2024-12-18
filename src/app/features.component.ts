import { Component } from '@angular/core';
import { PageHeaderComponent } from './page-header.component';

@Component({
  selector: 'app-features',
  imports: [PageHeaderComponent],
  template: `
    <app-page-header page_title="Features"/>
  `,
  styles: ``
})
export class FeaturesComponent {

}
