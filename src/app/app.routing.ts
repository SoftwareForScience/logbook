import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LogEntriesComponent} from './log-entries/log-entries.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { AddLogEntryComponent } from './add-log-entry/add-log-entry.component';
import {LogEntryDetailedViewComponent} from './log-entry-detailed-view/log-entry-detailed-view.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home/log-entries',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'log-entries',
                component: LogEntriesComponent
            }
        ]
    },
    {
        path: 'anthony',
        component: AddLogEntryComponent
    },
    {
        path: 'cyril',
        component: LogEntryDetailedViewComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
