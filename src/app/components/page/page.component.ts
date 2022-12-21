import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Page } from 'src/app/model';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})
export class PageComponent  {

  @Input()
  public page!: Page;
 
  @Output()
  public pageChange: EventEmitter<Page> = new EventEmitter<Page>();

  public onPanelChange() {
    this.pageChange.emit(this.page);
  }
}
