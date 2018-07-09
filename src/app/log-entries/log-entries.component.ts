import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/services/data/data.service';
import {LogEntriesService} from '../shared/services/log-entries/log-entries.service';

@Component({
    selector: 'app-log-entries',
    templateUrl: './log-entries.component.html',
    styleUrls: ['./log-entries.component.css']
})
export class LogEntriesComponent implements OnInit {

    p = 1;
    logEntries: LogEntry[] = [];
    mode = 'Compact';
    loading = true;

    constructor(private dataService: DataService,
                private logEntriesService: LogEntriesService) {
        this.dataService.subject.subscribe(value => {
            this.mode = value.mode;
        });
    }

    ngOnInit() {
        this.logEntriesService.getAllLogEntries().then(logEntriesArray => {
            this.logEntries = logEntriesArray;
            this.loading = false;
        });
    }
}

interface LogEntry {
    id: number;
    createdAt: string;
    subsystem: string;
    class: string;
    type: string;
    run: number;
    author: string;
    title: string;
    text: string;
    followUps: string;
    files: any[];
}
