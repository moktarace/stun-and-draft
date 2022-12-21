import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Bubble, Character, Image, Element } from 'src/app/model';

@Component({
    selector: 'app-ui-edit',
    templateUrl: './edit.component.html',
})
export class EditComponent {

    @Output()
    public edit: EventEmitter<Element> = new EventEmitter<Element>();

    private workingModel: Element | undefined;

    private originalModel: Element | undefined;

    constructor(private modalService: NgbModal) {}

    open(content: any) {
		  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    public get model(): Element | undefined {
      return this.workingModel;
    }

    @Input()
    public set model(value : Element | undefined) {
      if (value) {
        this.originalModel = value;
        this.workingModel = JSON.parse(JSON.stringify(value));
      } else {
        this.workingModel = undefined;
      }
    }

    public get modelImage(): Image | undefined {
      if (this.model && !("text" in this.model)  && !("pose" in this.model)) {
        return this.model as Image;
      }
      return undefined;
    }

    public get modelCharacter(): Character | undefined {
      if (this.model && "pose" in this.model) {
        return this.model as Character;
      }
      return undefined;
    }

    public get modelBubble(): Bubble | undefined {
      if (this.model && "text" in this.model) {
        return this.model as Bubble;
      }
      return undefined;
    }

    public onSave() {
      if (this.originalModel && this.workingModel) {
        Object.assign(this.originalModel, this.workingModel);
      }
      this.edit.emit(this.originalModel);
      this.modalService.dismissAll();
      this.workingModel = JSON.parse(JSON.stringify(this.originalModel));
    }
}