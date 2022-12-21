import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Element } from 'src/app/model';

@Component({
    selector: 'app-ui-element-control',
    templateUrl: './element-control.component.html',
})
export class ElementControlComponent {

    private static INIT_SCALE: number = 5;
    private static SCALE_STEP: number = 2;
    private static TIME: number = 100;

    @Input()
    public selected: Element | undefined;

    @Output()
    public selectedChange: EventEmitter<Element> = new EventEmitter<Element>();

    @Output()
    public unselect: EventEmitter<Element> = new EventEmitter<Element>();

    @Output()
    public delete: EventEmitter<Element> = new EventEmitter<Element>();

    @Output()
    public duplicate: EventEmitter<Element> = new EventEmitter<Element>();

    public pressUpLeft = () => this.move(this.scale * -1, this.scale * -1, 0);
    public pressUp = () => this.move(0, this.scale * -1, 0);
    public pressUpRight = () => this.move(this.scale, this.scale * -1, 0);

    public pressLeft = () => this.move(this.scale * -1, 0, 0);
    public pressRight = () => this.move(this.scale, 0, 0);

    public pressDownLeft = () => this.move(this.scale * -1, this.scale, 0);
    public pressDown = () => this.move(0, this.scale, 0);
    public pressDownRight = () => this.move(this.scale, this.scale, 0);
    
    public pressZoomPlus = () => this.zoom(this.scale * 2);
    public pressZoomMinus = () => this.zoom(this.scale * -1 * 2);

    public pressRotatePlus = () => this.rotate(this.scale);
    public pressRotateMinus = () => this.rotate(this.scale * -1);


    private intervalId: any;

    private scale: number = ElementControlComponent.INIT_SCALE;

    public move(x: number, y: number, z: number = 0): void {
        if (this.selected) {
            this.selected.x += x;
            this.selected.y += y;
            this.selected.z += z;
            this.selectedChange.emit(this.selected);
        }
    }

    public zoom(value: number): void {
        if (this.selected) {
            this.selected.scale += value;
            this.selected.x += -(value / 2);
            this.selected.y += -(value / 2);
            this.selectedChange.emit(this.selected);
        }
    }

    public rotate(value: number): void {
        if (this.selected) {
            this.selected.rotation += value;
            this.selectedChange.emit(this.selected);
        }
    }

    public flipX(): void {
        if (this.selected) {
            this.selected.flipX = !this.selected.flipX;
            this.selectedChange.emit(this.selected);
        }
    }

    public flipY(): void {
        if (this.selected) {
            this.selected.flipY = !this.selected.flipY;
            this.selectedChange.emit(this.selected);
        }
    }

    public onPressDown(action: (...args: any[]) => void): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        action();
        this.intervalId = setInterval(() => {
            this.scale += ElementControlComponent.SCALE_STEP;
            action();
        }, ElementControlComponent.TIME);
    }

    public onPressUp() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.scale = ElementControlComponent.INIT_SCALE;
    }

    public onEdit(): void {
        this.selectedChange.emit(this.selected);
    }

    public onUnselect(): void {
        this.unselect.emit(this.selected);
    }

    public onDelete(): void {
        this.delete.emit(this.selected);
    }

    public onDuplicate(): void {
        
        this.duplicate.emit(this.selected);
    }
}