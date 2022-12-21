import { Component, Input } from '@angular/core';
import { ElementComponent } from 'src/app/components/page/panel/element/element.component';
import { Bubble } from 'src/app/model';

@Component({
    selector: 'app-ui-edit-bubble',
    templateUrl: './edit-bubble.component.html',
})
export class EditBubbleComponent extends ElementComponent {

    private static NB_FORMAT: number = 32;

    @Input()
    public model: Bubble | undefined;

    public get formats(): any[] {
        const nb = EditBubbleComponent.NB_FORMAT;
        const result = [];
        for (let index = 1; index <= nb; index += 1) {
            const format = String(index).padStart(2, '0');
            result.push({
                format : format,
                src : this.getSrc("balloon", format, "thumbs")
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