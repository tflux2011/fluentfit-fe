import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  template: `
    <section class="bg-secondary dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <p class="mb-8 text-lg font-bold text-primary lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">{{page_title}}</p>
    </div>
</section>
  `,
  styles: ``,
  inputs:['page_title']
})
export class PageHeaderComponent {
  page_title!: string;
}
