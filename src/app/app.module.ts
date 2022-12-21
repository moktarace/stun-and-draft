import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PageComponent } from './components/page/page.component';
import { PanelComponent } from './components/panel/panel.component';
import { CommonModule } from '@angular/common';
import { BubbleComponent } from './components/panel/bubble/bubble.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    BubbleComponent,
    PanelComponent
  ],
  imports: [BrowserModule, CommonModule
    , HttpClientModule, FormsModule, AppRoutingModule, NgbModule],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule { }
