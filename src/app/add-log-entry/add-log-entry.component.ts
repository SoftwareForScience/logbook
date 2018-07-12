import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogEntriesService} from '../shared/services/log-entries/log-entries.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-log-entry',
    templateUrl: './add-log-entry.component.html',
    styleUrls: ['./add-log-entry.component.css']
})
export class AddLogEntryComponent implements OnInit {

    showTechnicalError = false;

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

    form: FormGroup;
    sendAttempt = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                private logEntriesService: LogEntriesService) {
        this.form = fb.group({
            date: [null, Validators.required],
            subsystems: [null, Validators.required],
            class: [null, Validators.required],
            type: [this.typeOptions[0], Validators.required],
            run: [null, Validators.required],
            author: [null, Validators.required],
            title: [null, Validators.required],
            text: [null, Validators.required],
            followups: [null],
            interruptionDuration: [null],
            interventionType: [null]
        });
    }

    ngOnInit() {
    }

    submitForm() {
        this.sendAttempt = true;
        this.showTechnicalError = false;

        if (this.form.valid) {
            this.logEntriesService.crateLogEntry({
                'created': this.formatDate(this.form.get('date').value),
                'subsystem': this.formatSubsystems(this.form.get('subsystems').value),
                'class': this.form.get('class').value,
                'type': this.form.get('type').value.label,
                'run': this.form.get('run').value,
                'author': this.form.get('author').value,
                'title': this.form.get('title').value,
                'log_entry_text': this.form.get('text').value,
                'follow_ups': this.form.get('followups').value,
                'interruption_duration': this.form.get('interruptionDuration').value,
                'intervention_type': this.form.get('interventionType').value,
            }).then(res => {
                this.router.navigate(['/home']);
            }).catch(err => {
                this.showTechnicalError = true;
            });
        }
    }

    formatSubsystems(subsystems) {
        let result = '';

        for (let i = 0; i < subsystems.length; i++) {
            result += subsystems[i].label;
            if (i !== subsystems.length - 1) {
                result += ', ';
            }
        }

        return result;
    }

    formatDate(date) {
        const year = '' + date.getFullYear();
        let month = '' + (date.getMonth() + 1);
        if (month.length === 1) {
            month = '0' + month;
        }
        let day = '' + date.getDate();
        if (day.length === 1) {
            day = '0' + day;
        }
        let hour = '' + date.getHours();
        if (hour.length === 1) {
            hour = '0' + hour;
        }
        let minute = '' + date.getMinutes();
        if (minute.length === 1) {
            minute = '0' + minute;
        }
        let second = '' + date.getSeconds();
        if (second.length === 1) {
            second = '0' + second;
        }

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }
}
