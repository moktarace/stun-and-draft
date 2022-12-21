import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Draft } from 'src/app/model';

@Component({
    selector: 'app-ui-page-control',
    templateUrl: './page-control.component.html',
})
export class PageControlComponent {

    @Input()
    public draft!: Draft;

    @Input()
    public currentPage!: number;

    @Output()
    public createPage: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public selectPage: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public duplicatePage: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public movePage: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public deletePage: EventEmitter<void> = new EventEmitter<void>();
    
    @Output()
    public exportToPNG: EventEmitter<void> = new EventEmitter<void>();

    public canMovePage(value: number): boolean {
        return (this.currentPage + value) >= 0 && (this.currentPage + value) < this.draft.pages.length;
    }

    public onMovePage(value: number): void {
        if (this.canMovePage(value)) {
            this.movePage.emit(value);
        }
    }

    public onDuplicatePage(): void {
        this.duplicatePage.emit();
    }

    public onDeletePage(): void {
        this.deletePage.emit();
    }

    public onExportToPng():void {
        this.exportToPNG.emit();
    }

    public onSelectPage(value: number): void {
        this.selectPage.emit(value);
    }

    public onCreatePage(): void {
        this.createPage.emit();
    }
}