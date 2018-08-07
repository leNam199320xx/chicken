import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { MainComponent } from './main/main.component';
import { AppService } from './app.service';
import { TimeLineService } from './common/timeline.service';
import { LoaderService } from './common/loader.service';
@NgModule({
    declarations: [
        AppComponent,
        StartComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [AppService, TimeLineService, LoaderService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
