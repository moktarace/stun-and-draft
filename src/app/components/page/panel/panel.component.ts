import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Panel, Element, Bubble } from 'src/app/model';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
})
export class PanelComponent {

  @Input()
  public panel!: Panel;

  @Output()
  public panelChange: EventEmitter<Panel> = new EventEmitter<Panel>();

  @Input()
  public width!: number;

  @Input()
  public height!: number;

  @Input()
  public margin!:number;

  @Input()
  public x!: number;

  @Input()
  public y!: number;

  @Input()
  public displayScale!: number;

  @Input()
  public selected: boolean = false;

  @Input()
  public disabled: boolean = false;

  @Input()
  public selectedElement: Element | undefined;
  
  @Output()
  public select: EventEmitter<Panel> = new EventEmitter<Panel>();

  @Output()
  public selectElement: EventEmitter<Element> = new EventEmitter<Element>();


  constructor() { }

  public get style(): any {
    const displayWidth = (this.width - this.margin * 2) * this.displayScale;
    const displayHeight = (this.height - this.margin * 2) * this.displayScale;
    return {
      "width" : displayWidth + "px",
      "height" : displayHeight + "px",
      "top" : (this.y + (this.height / 2)) * this.displayScale + "px",
      "left" :  (this.x + (this.width / 2)) * this.displayScale + "px",
      "transition": "heigth width 0.1s ease-in-out",
    }
  }

  public isElementSelected(element: Element): boolean {
    return this.selectedElement === element;
  }

  public onElementChange(): void {
    this.panelChange.emit(this.panel);
  }

  public onSelect(): void {
    if (!this.disabled && !this.selected) {
      this.select.emit(this.panel);
    }
  }

  public onSelectElement(element: Element): void {
    if (this.selected) {
      this.selectElement.emit(element);
    }
  }
}


