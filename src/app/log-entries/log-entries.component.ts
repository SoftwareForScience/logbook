import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../shared/services/data/data.service';
import {LogEntriesService} from '../shared/services/log-entries/log-entries.service';
import {LogEntry} from '../shared/services/log-entries/get-all-log-entries-return';
import {ModalTemplate, SuiModalService, TemplateModalConfig} from 'ng2-semantic-ui';
import {current} from 'codelyzer/util/syntaxKind';

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
    filteredLogEntries: LogEntry[] = [];
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
    filterTypes;
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

    typeOptions = [
        {
            'label': 'CAVERN',
            'id': 1
        },
        {
            'label': 'DCS',
            'id': 2
        },
        {
            'label': 'DQL/QA',
            'id': 3
        },
        {
            'label': 'EOS',
            'id': 4
        },
        {
            'label': 'General',
            'id': 5
        },
        {
            'label': 'Hardware',
            'id': 6
        },
        {
            'label': 'Software',
            'id': 7
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
            this.filteredLogEntries = this.logEntries;
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
            for (let i = 0; i < this.filteredLogEntries.length; i++) {
                if (this.filteredLogEntries[i].run_id === this.selectedLogEntry.run_id) {
                    this.selectedLogEntry = this.filteredLogEntries[i - 1];
                    break;
                }
            }
        }
        this.updatePopupButtonsState();
    }

    public updatePopupButtonsState() {
        this.isPreviousLogEntryButtonDisabled = false;
        this.isNextLogEntryButtonDisabled = false;

        for (let i = 1; i <= this.filteredLogEntries.length; i++) {
            if (this.filteredLogEntries[i - 1].run_id === this.selectedLogEntry.run_id) {
                if (i === 1) {
                    this.isPreviousLogEntryButtonDisabled = true;
                } else if (i === this.filteredLogEntries.length) {
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
        } else if (['Class', 'Author', 'Run', 'Title', 'Log entry', 'Followups'].indexOf(this.selectedFilterName) >= 0) {
            data = {
                'query': this.filterQuery
            };
        } else if (['Subsystem(s)'].indexOf(this.selectedFilterName) >= 0) {
            data = {
                'subsystems': this.filterSubsystems
            };
        } else if (['Type'].indexOf(this.selectedFilterName) >= 0) {
            data = {
                'types': this.filterTypes
            };
        } else {
            data = {
                'minDate': this.filterMinDateValue,
                'maxDate': this.filterMaxDateValue
            };
        }

        const newFilter = {
            'field': this.selectedFilterField,
            'filterName': this.selectedFilterName,
            'data': data
        };

        this.appliedFilters.push(newFilter);
        this.applyAllFilters();
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
        this.applyAllFilters();
    }

    public applyAllFilters() {
        let filteredLogEntries: LogEntry[] = this.logEntries;

        for (let i = 0; i < this.appliedFilters.length; i++) {
            const newFilteredLogEntries: LogEntry[] = [];
            const currentFilter = this.appliedFilters[i];

            if (['Id'].indexOf(currentFilter.filterName) >= 0) {
                for (let j = 0; j < filteredLogEntries.length; j++) {
                    const currentLogEntry = filteredLogEntries[j];
                    if (currentFilter.data.minimum) {
                        if (currentFilter.data.maximum) {
                            if (currentLogEntry.run_id <= currentFilter.data.maximum &&
                                currentLogEntry.run_id >= currentFilter.data.minimum) {
                                newFilteredLogEntries.push(currentLogEntry);
                            }
                        } else {
                            if (currentLogEntry.run_id >= currentFilter.data.minimum) {
                                newFilteredLogEntries.push(currentLogEntry);
                            }
                        }
                    } else if (currentFilter.data.maximum) {
                        if (currentLogEntry.run_id <= currentFilter.data.maximum) {
                            newFilteredLogEntries.push(currentLogEntry);
                        }
                    } else {
                        newFilteredLogEntries.push(currentLogEntry);
                    }
                }
            } else if (['Class', 'Author', 'Run', 'Title', 'Log entry', 'Followups'].indexOf(currentFilter.filterName) >= 0) {
                for (let j = 0; j < filteredLogEntries.length; j++) {
                    const currentLogEntry = filteredLogEntries[j];

                    if (currentLogEntry[currentFilter.field].toLowerCase().includes(currentFilter.data.query.toLowerCase())) {
                        newFilteredLogEntries.push(currentLogEntry);
                    }
                }
            } else if (['Type'].indexOf(currentFilter.filterName) >= 0) {
                for (let j = 0; j < filteredLogEntries.length; j++) {
                    const currentLogEntry = filteredLogEntries[j];
                    let found = false;

                    for (let x = 0; x < this.filterTypes.length; x++) {
                        const currentType = this.filterTypes[x];

                        if (currentLogEntry.type.toLowerCase().includes(currentType.label.toLowerCase())) {
                            found = true;
                            break;
                        }
                    }

                    if (found) {
                        newFilteredLogEntries.push(currentLogEntry);
                    }
                }
            } else if (['Subsystem(s)'].indexOf(currentFilter.filterName) >= 0) {
                for (let j = 0; j < filteredLogEntries.length; j++) {
                    const currentLogEntry = filteredLogEntries[j];
                    let found = false;

                    for (let x = 0; x < this.filterSubsystems.length; x++) {
                        const currentSubsystem = this.filterSubsystems[x];

                        if (currentLogEntry.subsystem.toLowerCase().includes(currentSubsystem.label.toLowerCase())) {
                            found = true;
                            break;
                        }
                    }

                    if (found) {
                        newFilteredLogEntries.push(currentLogEntry);
                    }
                }
            } else {
                // todo date
            }

            filteredLogEntries = newFilteredLogEntries;
        }

        this.filteredLogEntries = filteredLogEntries;
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
