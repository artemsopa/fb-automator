import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { API_URL } from './app-injection-token';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.api
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
