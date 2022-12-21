import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Draft } from 'src/app/model';

@Component({
    selector: 'app-ui-draft-control',
    templateUrl: './draft-control.component.html',
})
export class DraftControlComponent {

    @Input()
    public canUndo!: boolean;

    @Output()
    public undo: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public newDraft: EventEmitter<void> = new EventEmitter<void>();
    
    @Output()
    public exportToJSON: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public uploadFromJSON: EventEmitter<Draft> = new EventEmitter<Draft>();
    
    public onNewDraft():void {
        this.newDraft.emit();
    }

    public onUndo():void {
        if (this.canUndo) {
            this.undo.emit();
        }
    }

    public onExportToJSON():void {
        this.exportToJSON.emit();
    }
}