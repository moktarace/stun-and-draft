import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bubble, Element } from 'src/app/model';
import { ElementComponent } from '../element/element.component';

@Component({
    selector: 'app-bubble',
    templateUrl: './bubble.component.html',
})
export class BubbleComponent extends ElementComponent {

    @Input()
    public bubble!: Bubble;

    @Output()
    public bubbleChange: EventEmitter<Bubble> = new EventEmitter<Bubble>();

    @Input()
    public selected: boolean = false;

    @Input()
    public disabled: boolean = false;

    @Input()
    public displayScale!: number;

    @Output()
    public select: EventEmitter<Element> = new EventEmitter<Element>();

    public get src(): string {
        return this.getSrc("balloon", this.bubble.format);
    }

    public get style(): any {
        return this.getStyle(this.bubble, this.displayScale);
    }

    public get fontStyle(): any {
        return {
            "font-size" : ((this.bubble.scale * this.displayScale) / 11) + "px",
            "margin-top" : (20 -(this.bubble.text.length * this.displayScale)) + "px",
        };
    }

    public onTouch(event: TouchEvent) {
        this.touchMove(this.selected, this.bubble, this.bubbleChange, this.displayScale, event);
    }

    public onMouse(event: MouseEvent) {
        this.mouseMove(this.selected, this.bubble, this.bubbleChange, this.displayScale, event);
    }

    public onClick() {
        if (!this.disabled && !this.selected) {
            this.select.emit(this.bubble);
        }
    }

}