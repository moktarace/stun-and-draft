import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Character, Element } from 'src/app/model';
import { ElementComponent } from '../element/element.component';

@Component({
    selector: 'app-character',
    templateUrl: './../image/image.component.html',
})
export class CharacterComponent extends ElementComponent {

    @Input()
    public character!: Character;

    @Output()
    public characterChange: EventEmitter<Character> = new EventEmitter<Character>();

    @Input()
    public selected: boolean = false;

    @Input()
    public disabled: boolean = false;

    @Input()
    public displayScale!: number;

    @Output()
    public select: EventEmitter<Element> = new EventEmitter<Element>();

    public get src(): string {
        return this.getSrc("characters", this.character.pose + "/" + this.character.face + "_" + this.character.hair + "_" + this.character.angle);
    }

    public get style(): any {
        return this.getStyle(this.character, this.displayScale);
    }

    public onTouch(event: TouchEvent) {
        this.touchMove(this.selected, this.character, this.characterChange, this.displayScale, event);
    }

    public onClick() {
        if (!this.disabled && !this.selected) {
            this.select.emit(this.character);
        }
    }

}