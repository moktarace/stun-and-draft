import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Element, Panel } from 'src/app/model';

@Component({
    selector: 'app-ui-panel-control',
    templateUrl: './panel-control.component.html',
})
export class PanelControlComponent {

    @Input()
    public panel: Panel | undefined;
    
    @Output()
    public panelChange: EventEmitter<Panel> = new EventEmitter<Panel>();

    @Output()
    public createElement: EventEmitter<Element> = new EventEmitter<Element>();

    @Output()
    public createPanel: EventEmitter<Panel> = new EventEmitter<Panel>();

    @Output()
    public unselect:  EventEmitter<Panel> = new EventEmitter<Panel>();

    @Output()
    public delete:  EventEmitter<Panel> = new EventEmitter<Panel>();

    public createBubble(): void {
        if (!this.panel) {
            return;
        }
        let element = {
            text: '',
            format: '01',
            x: 200,
            y: 40,
            z: 0,
            scale: 200,
            flipX: false,
            flipY: false,
            rotation: 0
        };
        this.panel.bubble.push(element);
        this.createElement.emit(element);
    }

    public createCharacter(): void {
        if (!this.panel) {
            return;
        }
        let element = {
            x: 40,
            y: 40,
            z: 0,
            scale: 200,
            flipX: false,
            flipY: false,
            rotation: 0,
            pose: "001",
            face: "001",
            hair: "01",
            angle: "001",
        };
        this.panel.characters.push(element);
        this.createElement.emit(element);
    }

    public createSound(): void {
        if (!this.panel) {
            return;
        }
        let element = {
            x: 40,
            y: 40,
            z: 0,
            scale: 200,
            flipX: false,
            flipY: false,
            type: "sound",
            rotation: 0,
            format: "001"
        };
        this.panel.sounds.push(element);
        this.createElement.emit(element);
    }

    public createItem(): void {
        if (!this.panel) {
            return;
        }
        let element = {
            x: 40,
            y: 40,
            z: 0,
            scale: 200,
            flipX: false,
            flipY: false,
            rotation: 0,
            type: "item",
            format: "001"
        };
        this.panel.items.push(element);
        this.createElement.emit(element);
    }

    public createSign(): void {
        if (!this.panel) {
            return;
        }
        let element = {
            x: 40,
            y: 40,
            z: 0,
            scale: 200,
            flipX: false,
            flipY: false,
            type: "sign",
            rotation: 0,
            format: "001"
        };
        this.panel.signs.push(element);
        this.createElement.emit(element);
    }

    public createEffect(): void {
        if (!this.panel) {
            return;
        }
        let element = {
            x: 40,
            y: 40,
            z: 0,
            scale: 200,
            flipX: false,
            flipY: false,
            type: "effect",
            rotation: 0,
            format: "001"
        };
        this.panel.effects.push(element);
        this.createElement.emit(element);
    }

    public createBackground(): void {
        if (!this.panel) {
            return;
        }
        let element = {
            x: 0,
            y: 0,
            z: 0,
            scale: 200,
            flipX: false,
            flipY: false,
            type: "bg",
            rotation: 0,
            format: "001"
        };
        this.panel.background = element;
        this.createElement.emit(element);
    }

    public onCreatePanel(splitCol: number, splitRow : number): void {
        if (this.panel) {
            let newPanel: Panel = {
                col : this.panel.col,
                row : this.panel.row,
                colSize : this.panel.colSize,
                rowSize : this.panel.rowSize,
                characters: [],
                bubble: [],
                effects: [],
                sounds: [],
                items: [],
                signs: [],
                comments : []
            };
            const newColSize = this.panel.colSize * splitCol;
            const newRowSize = this.panel.rowSize * splitRow;
            if (newColSize != this.panel.colSize) {
                newPanel.colSize = Math.abs(newColSize - this.panel.colSize);
                newPanel.col += newColSize;
                this.panel.colSize = newColSize;
            }
            if (newRowSize != this.panel.rowSize) {
                newPanel.rowSize = Math.abs(newRowSize - this.panel.rowSize);
                newPanel.row += newRowSize;
                this.panel.rowSize = newRowSize;
            }
            this.createPanel.emit(newPanel);
        }
    }

    public onUnselect(): void {
        this.unselect.emit(this.panel);
    }

    public onDelete(): void {
        this.delete.emit(this.panel);
    }
}