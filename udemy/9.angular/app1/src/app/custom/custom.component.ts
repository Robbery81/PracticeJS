import {Component} from '@angular/core';

@Component({
  selector: 'app-post-custom',
  template: `
    <div>
      <h2>Title</h2>
    </div>
  `,
  styles: [`
  div {
    border: 1px solid black;
  }`]
})
export class CustomComponent {

}
