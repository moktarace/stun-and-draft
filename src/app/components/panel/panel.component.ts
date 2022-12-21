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
  public width : number | undefined;

  @Input()
  public height : number | undefined;

  @Output()
  public click: EventEmitter<Element> = new EventEmitter<Element>();

  public selected: Element | undefined;

  constructor() { }

  public createBubble(): void {
    this.panel.bubble.push({
      text: 'Hello',
      format: '01',
      x: 40,
      y: 40,
      z: 0,
      scale : 20,
      flip: false,
      rotation: 0
    });
    this.onElementChange();
  }

  public isSelected(element: Element): boolean {
    return this.selected === element;
  }

  public unselect(): any {
    this.selected = undefined;
  }

  public zoom(element: Element, value: number):void {
    element.scale += value;
    element.x += -(value / 2);
    element.y += -(value / 2);
    this.onElementChange();
  }

  public rotate(element: Element, value: number):void {
    element.rotation += value;
    this.onElementChange();
  }

  public flip(element: Element):void {
    element.flip = !element.flip;
    this.onElementChange();
  }

  public delete(element: Element): void {
    if (element) {
      console.log("hey", this.panel.bubble.indexOf(element as unknown as Bubble));
      this.panel.bubble.splice(this.panel.bubble.indexOf(element as unknown as Bubble), 1);
    }
    this.unselect();
  }

  public onElementChange(): void {
    this.panelChange.emit(this.panel);
  }

  public onClick(element: Element): void {
    this.selected = element;
    this.click.emit(element);
  }
}


