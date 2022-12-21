import { EventEmitter } from '@angular/core';
import { Element } from 'src/app/model';
import { environment } from 'src/environments/environment';

export class ElementComponent {

    protected getSrc(type: string, format: string, size:string="actuals"): string {
        return environment.srcUrl + "/" + size + "/" + type + "/" + format + ".png";
    }

    protected getStyle(element: Element, displayScale: number): any {
        let result = {
            "position": "absolute",
            "top": element.y * displayScale + "px",
            "left": element.x * displayScale + "px",
            "width": element.scale * displayScale + "px",
            "height": element.scale * displayScale + "px",
            "z-index": element.z,
            "transform": "rotate(" + (element.rotation) + "deg) scaleX(" + (element.flipX ? -1 : 1) + ") scaleY(" + (element.flipY ? -1 : 1) + ")",
            "transition": "heigth width 0.1s ease-in-out",
        }
        return result;
    }

    protected touchMove(selected: boolean, element: Element, eventEmitter: EventEmitter<any>, displayScale: number, event: TouchEvent) {
        if (!selected) {
            return;
        }
        const touch = event.targetTouches[0];
        element.x = touch.pageX * displayScale;
        element.y = touch.pageY * displayScale;
        event.preventDefault();
        eventEmitter.emit(element);
    }

    protected mouseMove(selected: boolean, element: Element, eventEmitter: EventEmitter<any>, displayScale: number, event: MouseEvent) {
        if (!selected && event.type != "mousedown") {
            return;
        }
        element.x = event.pageX * displayScale;
        element.y = event.pageY * displayScale;
        event.preventDefault();
        eventEmitter.emit(element);
    }

}