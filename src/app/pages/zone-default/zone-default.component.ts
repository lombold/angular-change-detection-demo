import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TopComponent} from './ui-components/top/top.component';

@Component({
  selector: 'app-zone-onpush',
  imports: [
    TopComponent
  ],
  template: `
    <app-top/>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ZoneDefaultComponent {

}
