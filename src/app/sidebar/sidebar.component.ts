import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    form: FormGroup;
    options = [
        {
            'label': 'Extended',
            'value': 'EXTENDED'
        },
        {
            'label': 'Compact',
            'value': 'COMPACT'
        }
    ];

    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            selectedOption: [this.options[0].label, Validators.required]
        });
    }

    ngOnInit() {
    }

}
