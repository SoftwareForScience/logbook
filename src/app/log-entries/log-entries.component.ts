import {Component, OnInit} from '@angular/core';
import logEntries from '../shared/mockup-data/log-entries';

@Component({
    selector: 'app-log-entries',
    templateUrl: './log-entries.component.html',
    styleUrls: ['./log-entries.component.css']
})
export class LogEntriesComponent implements OnInit {

    p = 1;
    logEntries: LogEntry[];
    mode = 'EXTENDED';

    constructor() {
        this.logEntries = logEntries;
    }

    ngOnInit() {
    }
}

interface LogEntry {
    createdAt: string;
    subsystem: string;
    class: string;
    type: string;
    run: number;
    author: string;
    title: string;
    text: string;
    followUps: any[];
    files: any[];
}
