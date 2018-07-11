import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-log-entry',
    templateUrl: './add-log-entry.component.html',
    styleUrls: ['./add-log-entry.component.css']
})
export class AddLogEntryComponent implements OnInit {

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
            'label': 'GENERAL',
            'id': 5
        },
        {
            'label': 'EOS',
            'id': 6
        },
        {
            'label': 'HARDWARE',
            'id': 7
        },
        {
            'label': 'SOFTWARE',
            'id': 8
        }
    ];

    form: FormGroup;
    sendAttempt = false;

    constructor(private fb: FormBuilder) {
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

        if (this.form.valid) {

        }
    }

}
