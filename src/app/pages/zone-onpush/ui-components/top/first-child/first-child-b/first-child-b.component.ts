import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../../../../../base.component';
import {SimpleChildComponent} from './simple-child/simple-child.component';

@Component({
  selector: 'app-first-child-b',
  imports: [
    NgClass,
    SimpleChildComponent
  ],
  template: `
    <div class="component" [ngClass]="getClasses()">
      {{ getComponentName() }}
      <button type="button" (click)="log()">Update</button>
      {{ counter }}
    </div>

    <div class="container">
      <app-simple-child/>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstChildBComponent extends BaseComponent {
  @Input() public counter = 0;

  constructor() {
    super('FirstChildBComponent');
  }
}
