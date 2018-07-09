import { Component, OnInit } from '@angular/core';
import { IOptionsValues } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-add-log-entry',
  templateUrl: './add-log-entry.component.html',
  styleUrls: ['./add-log-entry.component.css']
})
export class AddLogEntryComponent implements OnInit {

  selectedOptions_subs;
  selectedOptions_type;
  options_subs = [
    {
      "label": "CTP",
      "id": 1
    },
    {
      "label": "DCS",
      "id": 2
    },
    {
      "label": "ECS",
      "id": 3
    },
    {
      "label": "HLT",
      "id": 4
    },
    {
      "label": "TRG",
      "id": 5
    }
  ];

  options_type = [
    {
      "label": "CAVERN",
      "id": 1
    },
    {
      "label": "DCS",
      "id": 2
    },
    {
      "label": "DQL/QA",
      "id": 3
    },
    {
      "label": "EOS",
      "id": 4
    },
    {
      "label": "GENERAL",
      "id": 5
    },
    {
      "label": "EOS",
      "id": 6
    },
    {
      "label": "HARDWARE",
      "id": 7
    },
    {
      "label": "SOFTWARE",
      "id": 8
    }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
