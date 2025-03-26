import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FirstChildComponent} from './first-child/first-child.component';
import {SecondChildComponent} from './second-child/second-child.component';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'app-top',
  imports: [
    FirstChildComponent,
    SecondChildComponent,
    NgClass
  ],
  template: `
    <div class="component" [ngClass]="getClasses()">
      {{ getComponentName() }}
      <button type="button" (click)="log()">Update</button>
    </div>
    <div class="container">
      <app-first-child/>
      <app-second-child/>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopComponent extends BaseComponent {
  constructor() {
    super('TopComponent');
  }
}
