import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PageComponent } from './components/page/page.component';
import { PanelComponent } from './components/page/panel/panel.component';
import { CommonModule } from '@angular/common';
import { BubbleComponent } from './components/page/panel/bubble/bubble.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageComponent } from './components/page/panel/image/image.component';
import { CharacterComponent } from './components/page/panel/character/character.component';
import { ElementControlComponent } from './components/ui/element-control/element-control.component';
import { PanelControlComponent } from './components/ui/panel-control/panel-control.component';
import { EditComponent } from './components/ui/element-control/edit/edit.component';
import { EditImageComponent } from './components/ui/element-control/edit/edit-image/edit-image.component';
import { EditCharacterComponent } from './components/ui/element-control/edit/edit-character/edit-character.component';
import { EditBubbleComponent } from './components/ui/element-control/edit/edit-bubble/edit-bubble.component';
import { NgxCaptureModule } from 'ngx-capture';
import { PageControlComponent } from './components/ui/page-control/page-control.component';
import { DraftControlComponent } from './components/ui/draft-control/draft-control.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    BubbleComponent,
    CharacterComponent,
    ImageComponent,
    ElementControlComponent,
    PageControlComponent,
    PanelControlComponent,
    DraftControlComponent,
    EditComponent,
    EditCharacterComponent,
    EditImageComponent,
    EditBubbleComponent,
    PanelComponent
  ],
  imports: [BrowserModule, NgxCaptureModule, CommonModule
    , HttpClientModule, FormsModule, AppRoutingModule, NgbModule],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule { }
