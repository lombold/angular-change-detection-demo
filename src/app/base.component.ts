export class BaseComponent {
  protected toggle = false;

  constructor(private readonly componentName: string) {}

  getComponentName() {
    return this.componentName;
  }

  log() {
    console.log(`${this.componentName}: ------BUTTON CLICKED------`);
  }

  getClasses() {
    this.toggle = !this.toggle;
    return this.toggle ? 'blink-once-a' : 'blink-once-b';
  }
}
