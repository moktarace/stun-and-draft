import { Component } from "@angular/core";
import * as saveAs from "file-saver";
import { Draft, Element, Character, Bubble, Image, Panel, Page } from "./model";
import * as htmlToImage from "html-to-image";
import { NgxCaptureService } from "ngx-capture";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  
  public draft!: Draft;

  public history: Draft[] = [];

  public selectedPage: number = 0;

  public selectedPanel: Panel | undefined;

  public selectedElement: Element | undefined;

  public isFullscreen: boolean = false;

  constructor(private captureService: NgxCaptureService) {
    const storage = localStorage.getItem("draft");
    if (storage) {
      this.draft = JSON.parse(storage);
    }
    if (!this.draft || this.draft.pages?.length == 0) {
      this.onNewDraft();
    }
  }

  public get displayScale(): number {
    if (this.isFullscreen) {
      return 1;
    }
    if (window.screen.availHeight > window.screen.availWidth) {
      return (window.screen.availWidth / this.draft.width) * 0.9;
    }
    return (window.screen.availHeight / this.draft.height) * 0.6;
  }

  public canUndo(): boolean {
    return !!this.history.length;
  }

  public onUndo(): void {
    const previous = this.history.pop();
    if (previous) {
      this.draft = previous;
      this.selectedPanel = undefined;
      this.selectedElement = undefined;
      this.onDraftChange(false);
    }
  }

  public onCreatePage(saveHistory: boolean = true): void {
    this.draft.pages.push({
      panels: [
        {
          col: 0,
          row: 0,
          colSize: this.draft.grid,
          rowSize: this.draft.grid,
          bubble: [],
          background: undefined,
          effects: [],
          characters: [],
          signs: [],
          sounds: [],
          items: [],
          comments : []
        },
      ],
    });
    this.onDraftChange(saveHistory);
  }

  public onDeletePage() {
    if (confirm("Are you sure you want to delete this page ?")) {
      this.draft.pages.splice(this.selectedPage, 1);
      if (!this.draft.pages.length) {
        this.onCreatePage(false);
      }
      this.selectedPage = Math.max(this.selectedPage - 1, 0);
      this.onDraftChange();
    }
  }

  public onDeletePanel() {
    if (this.selectedPanel) {
      const currIndex = this.draft.pages[this.selectedPage].panels.indexOf(
        this.selectedPanel
      );
      if (currIndex) {
        const nextPanel =
          this.draft.pages[this.selectedPage].panels[currIndex - 1];
        if (nextPanel.col != this.selectedPanel.col) {
          nextPanel.colSize += this.selectedPanel.colSize;
        }
        if (nextPanel.row != this.selectedPanel.row) {
          nextPanel.rowSize = this.selectedPanel.rowSize;
        }
        this.draft.pages[this.selectedPage].panels.splice(currIndex, 1);
        this.onUnselectPanel();
        this.onDraftChange();
      }
    }
  }

  public onCreatePanel(panel: Panel) {
    if (this.selectedPanel) {
      const currIndex = this.draft.pages[this.selectedPage].panels.indexOf(
        this.selectedPanel
      );
      this.draft.pages[this.selectedPage].panels.splice(
        currIndex + 1,
        0,
        panel
      );
      this.onDraftChange();
    }
  }

  public onCreateElement(element: Element) {
    if (this.selectedPanel) {
      this.onSelectElement(element);
      this.onDraftChange();
    }
  }

  public onSelectPanel(panel: Panel): void {
    this.selectedPanel = panel;
  }

  public onSelectElement(element: Element): void {
    this.selectedElement = element;
  }

  public onUnselectElement(): any {
    this.selectedElement = undefined;
  }

  public onUnselectPanel(): any {
    this.selectedPanel = undefined;
  }

  public onDeleteElement() {
    if (this.selectedPanel && this.selectedElement) {
      if (this.selectedPanel.background == this.selectedElement) {
        this.selectedPanel.background = undefined;
        this.onUnselectElement();
        this.onDraftChange();
        return;
      }
      let index = this.selectedPanel.characters.indexOf(
        this.selectedElement as Character
      );
      if (index > -1) {
        this.selectedPanel.characters.splice(index, 1);
        this.onUnselectElement();
        this.onDraftChange();
        return;
      }
      index = this.selectedPanel.bubble.indexOf(this.selectedElement as Bubble);
      if (index > -1) {
        this.selectedPanel.bubble.splice(index, 1);
        this.onUnselectElement();
        this.onDraftChange();
        return;
      }
      index = this.selectedPanel.effects.indexOf(this.selectedElement as Image);
      if (index > -1) {
        this.selectedPanel.effects.splice(index, 1);
        this.onUnselectElement();
        this.onDraftChange();
        return;
      }
      index = this.selectedPanel.items.indexOf(this.selectedElement as Image);
      if (index > -1) {
        this.selectedPanel.items.splice(index, 1);
        this.onUnselectElement();
        this.onDraftChange();
        return;
      }
      index = this.selectedPanel.sounds.indexOf(this.selectedElement as Image);
      if (index > -1) {
        this.selectedPanel.sounds.splice(index, 1);
        this.onUnselectElement();
        this.onDraftChange();
        return;
      }
      index = this.selectedPanel.items.indexOf(this.selectedElement as Image);
      if (index > -1) {
        this.selectedPanel.items.splice(index, 1);
        this.onUnselectElement();
        this.onDraftChange();
        return;
      }
      index = this.selectedPanel.signs.indexOf(this.selectedElement as Image);
      if (index > -1) {
        this.selectedPanel.signs.splice(index, 1);
        this.onUnselectElement();
        this.onDraftChange();
        return;
      }
    }
  }

  public onSelectPage(value : number): void {
    this.onUnselectElement();
    this.onUnselectPanel();
    this.selectedPage = value;
  }

  public onPageChange(): void {
    this.onUnselectElement();
    this.onUnselectPanel();
    this.onDraftChange();
  }

  public onDraftChange(saveHistory: boolean = true): void {
    if (saveHistory) {
      const previous = localStorage.getItem("draft");
      if (previous) {
        this.history.push(JSON.parse(previous));
      }
    }
    localStorage.setItem("draft", JSON.stringify(this.draft));
  }

  public onExportToJSON() {
    const str = JSON.stringify(this.draft);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, this.draft.name);
  }

  public onExportToPNG() {
    let node: any = document.getElementsByClassName("page").item(0)
    htmlToImage
      .toCanvas(node, {
        cacheBust: true,
        fetchRequestInit: {
          mode: "no-cors",
        },
      })
      .then((url) => {
        const name =
          this.draft.name +
          " page " +
          (this.selectedPage + 1) +
          " of " +
          (this.draft.pages.length + 1);
        saveAs(url.toDataURL(), name);
        this.isFullscreen = false;
      });
  }

  public onNewDraft(warn: boolean=false) {
    if (warn && !confirm("Are you sure ? You're gonna lost an unexported draft")) {
      return;
    }
    this.draft = {
      name: "Draft 01",
      description: "",
      version: "0.1",
      width: 1080,
      height: 1080,
      grid: 4,
      margin: 10,
      pages: [],
    };
    this.onCreatePage();
    this.history = [];
  }

  public onDuplicatePage() {
    const newPage: Page = JSON.parse(JSON.stringify(this.draft.pages[this.selectedPage]));
    this.draft.pages.splice(this.selectedPage + 1, 0, newPage);
    this.onDraftChange();
  }

  public onMovePage(value: number) {
    const newPosition = this.selectedPage + value;
    const page = this.draft.pages[this.selectedPage];
    this.draft.pages.splice(this.selectedPage, 1);
    this.draft.pages.splice(newPosition, 0, page);
    this.selectedPage = newPosition;
    this.onDraftChange();
  }
}
