import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElementComponent } from 'src/app/components/page/panel/element/element.component';
import { Image } from 'src/app/model';

@Component({
    selector: 'app-ui-edit-image',
    templateUrl: './edit-image.component.html',
})
export class EditImageComponent extends ElementComponent {

    private static NB_FORMAT: any = {
        'sound' : 179,
        'bg' : 63,
        'effect' : 42,
        'item' : 19,
        'sign' : 42,

    }

    @Input()
    public model: Image | undefined;

    @Input()
    public type: string = "";

    public get formats(): any[] {
        const nb = EditImageComponent.NB_FORMAT[this.type] || 1;
        const result = [];
        for (let index = 1; index <= nb; index += 1) {
            const format = String(index).padStart(3, '0');
            result.push({
                format : format,
                src : this.getSrc(this.type, format, "thumbs")
            });
        }
        return result;
    }

    public onSelect(format: string): void {
        if (this.model) {
            this.model.format = format;
        }
    }

}