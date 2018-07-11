import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../shared/services/data/data.service';
import {LogEntriesService} from '../shared/services/log-entries/log-entries.service';
import {LogEntry} from '../shared/services/log-entries/get-all-log-entries-return';
import {ModalTemplate, SuiModalService, TemplateModalConfig} from 'ng2-semantic-ui';

@Component({
    selector: 'app-log-entries',
    templateUrl: './log-entries.component.html',
    styleUrls: ['./log-entries.component.css']
})
export class LogEntriesComponent implements OnInit {

    @ViewChild('detailModalTemplate')
    public detailModalTemplate: ModalTemplate<IContext, string, string>;
    @ViewChild('filterModalTemplate')
    public filterModalTemplate: ModalTemplate<IContext, string, string>;
    p = 1;
    logEntries: LogEntry[] = [];
    selectedLogEntry: LogEntry;
    selectedFilterName: string;
    selectedFilterField: string;
    appliedFilters = [];
    isPreviousLogEntryButtonDisabled = false;
    isNextLogEntryButtonDisabled = false;
    mode = 'Extended';
    loading = true;

    filterQuery = '';
    filterMinValue;
    filterMaxValue;
    filterMinDateValue;
    filterMaxDateValue;
    filterSubsystems;

    subsystemOptions = [
        {
            'label': 'CTP',
            'id': 1
        },
        {
            'label': 'DCS',
            'id': 2
        },
        {
            'label': 'ECS',
            'id': 3
        },
        {
            'label': 'HLT',
            'id': 4
        },
        {
            'label': 'TRG',
            'id': 5
        }
    ];

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

        const config = new TemplateModalConfig<IContext, string, string>(this.detailModalTemplate);
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

    public filterLogEntries(filterName, filterField) {
        this.selectedFilterName = filterName;
        this.selectedFilterField = filterField;

        const config = new TemplateModalConfig<IContext, string, string>(this.filterModalTemplate);
        config.transitionDuration = 0;

        this.modalService
            .open(config);
    }

    public applyFilter() {
        this.removeFilter();

        let data;

        if (['Id'].indexOf(this.selectedFilterName) >= 0) {
            data = {
                'minimum': this.filterMinValue,
                'maximum': this.filterMaxValue
            };
        } else if (['Class', 'Type', 'Author', 'Run', 'Title', 'Log entry', 'Followups'].indexOf(this.selectedFilterName) >= 0) {
            data = {
                'query': this.filterQuery
            };
        } else if (['Subsystem(s)'].indexOf(this.selectedFilterName) >= 0) {
            data = {
                'subsystems': this.filterSubsystems
            };
        } else {
            data = {
                'minDate': this.filterMinDateValue,
                'maxDate': this.filterMaxDateValue
            };
        }

        const newFilter = {
            'field': this.selectedFilterField,
            'data': data
        };

        this.appliedFilters.push(newFilter);
        this.applyAllFilters();

        console.log(this.appliedFilters);
    }

    public removeFilter() {
        const newAppliedFilters = this.appliedFilters;
        for (let i = 0; i < this.appliedFilters.length; i++) {
            if (this.appliedFilters[i].field === this.selectedFilterField) {
                newAppliedFilters.splice(i, 1);
                break;
            }
        }

        this.appliedFilters = newAppliedFilters;
    }

    public applyAllFilters() {
        // todo
    }

    public isFilterApplied(filterField): boolean {
        for (let i = 0; i < this.appliedFilters.length; i++) {
            if (this.appliedFilters[i].field === filterField) {
                return true;
            }
        }

        return false;
    }
}

interface IContext {
    data: string;
}
