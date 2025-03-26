import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'app-first-child-b',
  imports: [
    NgClass
  ],
  template: `
    <div class="component" [ngClass]="getClasses()">
      {{ getComponentName() }}
      <button type="button" (click)="log()">Update</button>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstChildBComponent extends BaseComponent {
  constructor() {
    super('FirstChildBComponent');
  }
}
