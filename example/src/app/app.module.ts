import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LayoutManagerService } from './layout-manager.service';
import { enhancedComponentInitializer } from './enhanced-component-initializer.provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LayoutManagerService,
    enhancedComponentInitializer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
