import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LogEntriesComponent} from './log-entries/log-entries.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { AddLogEntryComponent } from './add-log-entry/add-log-entry.component';

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
                path: '',
                redirectTo: 'log-entries',
                pathMatch: 'full'
            },
            {
                path: 'log-entries',
                component: LogEntriesComponent
            }
        ]
    },
    {
        path: 'add-log-entry',
        component: AddLogEntryComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
