import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../shared/services/data/data.service';
import {LogEntriesService} from '../shared/services/log-entries/log-entries.service';
import {LogEntry} from '../shared/services/log-entries/get-all-log-entries-return';
import {ModalTemplate, SuiModalService, TemplateModalConfig} from 'ng2-semantic-ui';
import {IContext} from '../log-entry-detailed-view/log-entry-detailed-view.component';

@Component({
    selector: 'app-log-entries',
    templateUrl: './log-entries.component.html',
    styleUrls: ['./log-entries.component.css']
})
export class LogEntriesComponent implements OnInit {

    @ViewChild('modalTemplate')
    public modalTemplate: ModalTemplate<IContext, string, string>;
    p = 1;
    logEntries: LogEntry[] = [];
    selectedLogEntry: LogEntry;
    isPreviousLogEntryButtonDisabled = false;
    isNextLogEntryButtonDisabled = false;
    mode = 'Compact';
    loading = true;

    constructor(private dataService: DataService,
                public modalService: SuiModalService,
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

    public viewLogEntry(logEntry) {
        this.selectedLogEntry = logEntry;
        this.updatePopupButtonsState();

        const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
        config.transitionDuration = 250;

        this.modalService
            .open(config)
            .onApprove(result => { /* approve callback */
            })
            .onDeny(result => { /* deny callback */
            });
    }

    public nextLogEntry() {
        if (!this.isNextLogEntryButtonDisabled) {
            for (let i = 0; i < this.logEntries.length; i++) {
                if (this.logEntries[i].run_id === this.selectedLogEntry.run_id) {
                    this.selectedLogEntry = this.logEntries[i + 1];
                    break;
                }
            }
        }
        this.updatePopupButtonsState();
    }

    public previousLogEntry() {
        if (!this.isPreviousLogEntryButtonDisabled) {
            for (let i = 0; i < this.logEntries.length; i++) {
                if (this.logEntries[i].run_id === this.selectedLogEntry.run_id) {
                    this.selectedLogEntry = this.logEntries[i - 1];
                    break;
                }
            }
        }
        this.updatePopupButtonsState();
    }

    public updatePopupButtonsState() {
        this.isPreviousLogEntryButtonDisabled = false;
        this.isNextLogEntryButtonDisabled = false;

        for (let i = 1; i <= this.logEntries.length; i++) {
            if (this.logEntries[i - 1].run_id === this.selectedLogEntry.run_id) {
                if (i === 1) {
                    this.isPreviousLogEntryButtonDisabled = true;
                } else if (i === this.logEntries.length) {
                    this.isNextLogEntryButtonDisabled = true;
                }
                break;
            }
        }
    }
}
