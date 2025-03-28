import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SimpleChildComponent} from './simple-child/simple-child.component';
import {AsyncPipe, NgClass} from '@angular/common';
import {BaseComponent} from '../../../../../../base.component';
import {StateService} from '../../../../../../services/state.service';

@Component({
  selector: 'app-first-child-a',
  imports: [
    SimpleChildComponent,
    NgClass,
    AsyncPipe
  ],
  template: `
    <div class="component" [ngClass]="getClasses()">
      {{ getComponentName() }}
      <button type="button" (click)="log()">Update</button>
      <button type="button" (click)="stateService.incrementPlain()">Plain++</button>
      <button type="button" (click)="stateService.incrementSignal()">Signal++</button>
      <button type="button" (click)="stateService.incrementWrapped()">Wrapped++</button>
      <button type="button" (click)="stateService.incrementSubject()">Subject++</button>
      <pre>
        State Service Values:
        Plain: {{ stateService.valuePlain }}
        Signal: {{ stateService.valueSignal() }}
        Wrapped: {{ stateService.valueWrapped.value }}
        Observable: {{ stateService.valueSubject$$.asObservable() | async }}
      </pre>
    </div>

    <div class="container">
      <app-simple-child/>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstChildAComponent extends BaseComponent {
  constructor(public readonly stateService: StateService) {
    super('FirstChildAComponent');
  }
}
