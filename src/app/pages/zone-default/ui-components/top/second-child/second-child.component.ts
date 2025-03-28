import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
import {BaseComponent} from '../../../../../base.component';
import {StateService} from '../../../../../services/state.service';

@Component({
  selector: 'app-second-child',
  imports: [
    NgClass,
    AsyncPipe
  ],
  template: `
    <div class="component" [ngClass]="getClasses()">
      <div class="line"></div>
      {{ getComponentName() }}
      <button type="button" (click)="log()">Update</button>
      <pre>
        State Service Values:
        Plain: {{ stateService.valuePlain }}
        Signal: {{ stateService.valueSignal() }}
        Wrapped: {{ stateService.valueWrapped.value }}
        Observable: {{ stateService.valueSubject$$.asObservable() | async }}
      </pre>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default
})
export class SecondChildComponent extends BaseComponent {
  constructor(public readonly stateService: StateService) {
    super('SecondChildComponent');
  }
}
