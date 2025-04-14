import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-zone-playground',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="run-outside-angular">
      <p class="label">Zone Playground</p>
      <div class="component flex-col blink-once-a" #flashingDiv>
        <div class="flex-row flex-justify-between flex-align-center">
          <h3>Flashing when Zone is triggered</h3>
        </div>
      </div>
      <h2>Ways to trigger Application Ticks</h2>
      <div class="flex-row flex-wrap">
        <div class="box flex-col">
          <h3>DOM Events</h3>
          <button type="button" (click)="log('Clicked!')">Click!</button>
        </div>

        <div class="box flex-col">
          <h3>Timeouts / Intervals</h3>
          <div>Delay (s): <input type="number" #intervalInput value="1" /></div>
          <button type="button" (click)="startInterval(intervalInput.value)">
            {{ timeoutId ? 'Stop Interval' : 'Start Interval' }}
          </button>
        </div>

        <div class="box flex-col">
          <h3>Promises / HttpRequests</h3>
          <button type="button" (click)="sendRequest()">
            Send Request (3s)
          </button>
        </div>

        <div class="box flex-col">
          <h3>requestAnimationFrame()</h3>
          <pre data-code>
            requestAnimationFrame(() => [...]);
          </pre
          >
        </div>

        <div class="box flex-col">
          <h3>MutationObserver / MediaQuery Listensers</h3>
          <pre data-code>
            const mediaQueryList = window.matchMedia('(max-width: 600px)');
            mediaQueryList.addEventListener('change', (event) => {{ '{' }}
            console.log('Media query matched:', event.matches);
            {{ '}' }});
          </pre
          >
        </div>
      </div>
    </div>
  `,
  imports: [],
  styles: [
    `
      .run-outside-angular {
        margin: 0;
        background-color: lightyellow;
        padding: 2rem;
        border: orange 6px dotted;
        white-space-collapse: preserve-breaks;
        position: relative;

        > .label {
          position: absolute;
          top: 0;
          left: 0;
          background-color: lightgoldenrodyellow;
          padding: 0.5rem;
          z-index: 1;
          border: 1px solid orange;
          margin: 0;
        }
      }

      .box {
        margin: 0 1rem 1rem 1rem;
        padding: 1rem;
        background-color: lightgray;
      }
    `,
  ],
})
export class ZonePlaygroundComponent implements OnInit, OnDestroy {
  private readonly flashingDiv =
    viewChild<ElementRef<HTMLDivElement>>('flashingDiv');

  constructor(
    private readonly ngZone: NgZone,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.setupZoneChangeMonitor();
    this.listenToMediaQuery();
  }

  ngOnDestroy() {}

  setupZoneChangeMonitor() {
    this.ngZone.runOutsideAngular(() => {
      this.ngZone.onMicrotaskEmpty
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.flashingDiv()?.nativeElement.classList.toggle('blink-once-a');
          this.flashingDiv()?.nativeElement.classList.toggle('blink-once-b');
          this.log('Microtask completed');
        });
    });
  }

  log(text: string) {
    console.log(text);
  }

  // Different Zone triggers

  // 1. setTimeout / setInterval
  protected timeoutId: any;

  startInterval(value: string) {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
      this.timeoutId = null;
      return;
    }
    this.timeoutId = setInterval(
      () => {
        this.log('Interval triggered');
      },
      1000 * Number(value),
    );
  }

  // 2. Promise / HttpClient
  async sendRequest() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  // 3. requestAnimationFrame
  public requestAnimationFrame() {
    const animate = () => {
      console.log('Animation frame triggered');
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  // 4. MutationObserver / MediaQuery Listeners
  public listenToMediaQuery() {
    const mediaQueryList = window.matchMedia('(min-width: 1000px)');
    mediaQueryList.addEventListener('change', (event) => {
      console.log('Media query matched:', event.matches);
    });
  }
}
