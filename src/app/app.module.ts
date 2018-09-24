import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EditstoryComponent } from './editstory/editstory.component';
import { EheaderComponent } from './editstory/eheader/eheader.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PagesModule,
    routing,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    AppComponent,
    EditstoryComponent,
    EheaderComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
