import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogEntriesComponent } from './log-entries/log-entries.component';
import {routes} from './app.routing';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddLogEntryComponent } from './add-log-entry/add-log-entry.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {DataService} from './shared/services/data/data.service';
import {LogEntriesService} from './shared/services/log-entries/log-entries.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        LogEntriesComponent,
        HomeComponent,
        PageNotFoundComponent,
        AddLogEntryComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        SuiModule
    ],
    providers: [
        DataService,
        LogEntriesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
