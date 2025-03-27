import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../../../../../base.component';

@Component({
  selector: 'app-first-child-b',
  imports: [
    NgClass
  ],
  template: `
    <div class="component" [ngClass]="getClasses()">
      {{ getComponentName() }}
      <button type="button" (click)="log()">Update</button>
      {{ counter }}
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default
})
export class FirstChildBComponent extends BaseComponent {
  @Input() public counter = 0;

  constructor() {
    super('FirstChildBComponent');
  }
}
