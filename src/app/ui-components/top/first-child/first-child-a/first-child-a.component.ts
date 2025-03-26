import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SimpleChildComponent} from './simple-child/simple-child.component';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'app-first-child-a',
  imports: [
    SimpleChildComponent,
    NgClass
  ],
  template: `
    <div class="component" [ngClass]="getClasses()">
      {{ getComponentName() }}
      <button type="button" (click)="log()">Update</button>
    </div>

    <div class="container">
      <app-simple-child/>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstChildAComponent extends BaseComponent {
  constructor() {
    super('FirstChildAComponent');
  }
}
