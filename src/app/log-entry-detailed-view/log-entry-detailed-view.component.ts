import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import {ViewChild, Component} from '@angular/core'

export interface IContext {
    data:string;
}

@Component({
  selector: 'app-log-entry-detailed-view',
  templateUrl: './log-entry-detailed-view.component.html',
  styleUrls: ['./log-entry-detailed-view.component.css']
})

export class LogEntryDetailedViewComponent {
    @ViewChild('modalTemplate')
    public modalTemplate:ModalTemplate<IContext, string, string>

    constructor(public modalService:SuiModalService) {}

    public open(dynamicContent:string = "Example") {
      const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
  
      config.closeResult = "closed!";
      config.context = { data: dynamicContent };
  
      this.modalService
          .open(config)
          .onApprove(result => { /* approve callback */ })
          .onDeny(result => { /* deny callback */});
  }
}