import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Image, Element } from 'src/app/model';
import { ElementComponent } from '../element/element.component';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
})
export class ImageComponent extends ElementComponent {

    @Input()
    public image!: Image;
    
    @Output()
    public imageChange: EventEmitter<Image> = new EventEmitter<Image>();

    @Input()
    public type!: string;

    @Input()
    public displayScale!: number;

    @Input()
    public selected: boolean = false;

    @Input()
    public disabled: boolean = false;

    @Output()
    public select: EventEmitter<Element> = new EventEmitter<Element>();

    public get src(): string {
        return this.getSrc(this.type, this.image.format);
    }

    public get style(): any {
        return this.getStyle(this.image, this.displayScale);
    }

    public onTouch(event: TouchEvent) {
        this.touchMove(this.selected, this.image, this.imageChange, this.displayScale, event);
    }

    public onClick() {
        if (!this.disabled && !this.selected) {
            this.select.emit(this.image);
        }
    }

}