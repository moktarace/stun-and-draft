import { OnInit, Component } from "@angular/core";
import { Page } from "./model";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {

  public page: Page = {
    panels: [{
      bubble : [{
        text : "Salut le monde",
        x : 20,
        y : 0,
        z : 0,
        scale : 20,
        format : "01",
        flip  : true,
        rotation : -93
      }],
      effects : [],
      characters : []
    }]
  };

  constructor() {
    const storage = localStorage.getItem("page")
    if (storage) {
      this.page = JSON.parse(storage);
    }
  }

  public ngOnInit(): void {
  }

  public onPageChange(): void {
    localStorage.setItem("page", JSON.stringify(this.page));
  }
}
