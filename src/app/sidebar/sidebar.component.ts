import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../shared/services/data/data.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    form: FormGroup;
    options = [
        {
            'label': 'Extended'
        },
        {
            'label': 'Compact'
        }
    ];

    constructor(private fb: FormBuilder,
                private dataService: DataService) {
        this.form = fb.group({
            selectedOption: [this.options[0].label, Validators.required]
        });
    }

    ngOnInit() {
        this.emitViewMode();
    }

    emitViewMode() {
        this.dataService.setViewMode(this.form.get('selectedOption').value);
    }
}
