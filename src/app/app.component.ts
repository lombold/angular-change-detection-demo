import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {BaseComponent} from './base.component';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    NgClass,
    RouterOutlet
  ],
  template: `
    <main>
      <div class="component" [ngClass]="getClasses()">
        {{ getComponentName() }}
        <button type="button" (click)="log()">Update</button>
      </div>
      <div class="container">
        <router-outlet/>
      </div>
      <div class="readme">
        <h3>Zone</h3>
        <p>Watches:</p>
        <ul>
          <li>UI Events (e.g. onclick)</li>
          <li>Tasks ending (e.g. setTimout, setInterval, finshed XHR)</li>
        </ul>
      </div>
    </main>
  `,
  styles: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent {
  constructor() {
    super('AppComponent');
  }
}
