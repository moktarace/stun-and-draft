import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { Bubble } from 'src/app/model';

@Component({
    selector: 'app-bubble',
    templateUrl: './bubble.component.html',
})
export class BubbleComponent {

    @Input()
    public bubble!: Bubble;

    @Output()
    public bubbleChange: EventEmitter<Bubble> = new EventEmitter<Bubble>();

    @Input()
    public selected: boolean = false;
    
    @Output()
    public click: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    public get src(): string {
        return "/assets/actual/bubble/" + this.bubble?.format + ".png";
    }

    public get style(): any {
        let result = {
            "position": "absolute",
            "top": this.bubble.x + "%",
            "left": this.bubble.y + "%",
            "width" : this.bubble.scale + "%",
            "height" : this.bubble.scale + "%",
            "transform": "rotate(" + this.bubble.rotation + "deg) scaleX(" + (this.bubble.flip ? -1 : 1) + ")",
            "cursor" : "pointer"
        }
        result = {
            "position": "absolute",
            "top": this.bubble.x + "px",
            "left": this.bubble.y + "px",
            "width" : this.bubble.scale + "px",
            "height" : this.bubble.scale + "px",
            "transform": "rotate(" + this.bubble.rotation + "deg) scaleX(" + (this.bubble.flip ? -1 : 1) + ")",
            "cursor" : "pointer"
        }
        return result;
    }

    public onClick() {
        this.click.emit();
    }

}