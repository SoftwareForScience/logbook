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
        RouterModule.forRoot(routes),
        SuiModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
