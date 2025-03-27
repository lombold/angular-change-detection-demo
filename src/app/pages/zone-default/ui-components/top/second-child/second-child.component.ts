import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../../../../base.component';

@Component({
  selector: 'app-second-child',
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
  changeDetection: ChangeDetectionStrategy.Default
})
export class SecondChildComponent extends BaseComponent {
  constructor() {
    super('SecondChildComponent');
  }
}
