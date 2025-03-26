import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FirstChildAComponent} from './first-child-a/first-child-a.component';
import {FirstChildBComponent} from './first-child-b/first-child-b.component';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'app-first-child',
  imports: [
    FirstChildAComponent,
    FirstChildBComponent,
    NgClass
  ],
  template: `
    <div class="component" [ngClass]="getClasses()">
      {{ getComponentName() }}
      <button type="button" (click)="log()">Update</button>
    </div>
    <div class="container">
      <app-first-child-a/>
      <app-first-child-b/>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstChildComponent extends BaseComponent {
  constructor() {
    super('FirstChildComponent');
  }
}
