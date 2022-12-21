import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Page, Element, Panel } from 'src/app/model';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})
export class PageComponent  {

  @Input()
  public page!: Page;

  @Input()
  public width!: number;

  @Input()
  public height!: number;

  @Input()
  public margin!:number;
  
  @Input()
  public grid!:number;

  @Input()
  public displayScale!: number;
  
  @Input()
  public selectedPanel: Panel | undefined;

  @Input()
  public selectedElement: Element | undefined;
  
  @Output()
  public selectPanel: EventEmitter<Panel> = new EventEmitter<Panel>();

  @Output()
  public selectElement: EventEmitter<Element> = new EventEmitter<Element>();
 
  @Output()
  public pageChange: EventEmitter<Page> = new EventEmitter<Page>();

  public get style(): any {
    return {
      "width" : this.width * this.displayScale + "px",
      "height" : this.height * this.displayScale + "px",
      "transition": "heigth width 0.1s ease-in-out",
    }
  }

  public getPanelHeight(panel: Panel): number {
    return panel.rowSize * (this.height / this.grid);
  }

  public getPanelWidth(panel: Panel): number {
    return panel.colSize * (this.width / this.grid);
  }

  public getPanelX(panel: Panel): number {
    return panel.col * (this.width / this.grid);
  }

  public getPanelY(panel: Panel): number {
    return panel.row * (this.height / this.grid);
  }
  
  public onPanelChange() {
    this.pageChange.emit(this.page);
  }
  
  public onSelectPanel(panel: Panel): void {
    this.selectPanel.emit(panel);
  }

  public onSelectElement(element: Element): void {
    this.selectElement.emit(element);
  }

}
