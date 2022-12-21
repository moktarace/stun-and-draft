import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElementComponent } from 'src/app/components/page/panel/element/element.component';
import { Character, Image } from 'src/app/model';

@Component({
    selector: 'app-ui-edit-character',
    templateUrl: './edit-character.component.html',
})
export class EditCharacterComponent extends ElementComponent {

    private static NB_FORMAT: any = {
        'hair': 7,
        'face': 58,
        'pose': 95,
        'angle': 15
    }

    @Input()
    public model: any | undefined;

    public types: string[] = Object.keys(EditCharacterComponent.NB_FORMAT);

    public selectedType: string = "hair";

    public get formats(): any {
        const result: any = {};
        for (let key of this.types) {
            result[key] = [];
            for (let index = 1; index <= EditCharacterComponent.NB_FORMAT[key]; index += 1) {
                const currFormat = String(index).padStart(key === "face" ? 2 : 3, '0');
                result[key].push({
                    format: currFormat,
                    src: this.getSrc(key, currFormat, "thumbs/characters")
                });
            }
        }

        return result;
    }

    public isSelected(format: any) {
        return this.model && (format.format.padStart(3, '0') === this.model[this.selectedType] ||
            (format.format.slice(1) === this.model.hair && this.selectedType === "hair"))
    }

    public onSelect(format: string): void {
        if (this.model) {
            this.model[this.selectedType] = format.padStart(3, '0');
            if (this.selectedType == "hair") {
                this.model[this.selectedType] = format.slice(1);
            }
        }
    }

}