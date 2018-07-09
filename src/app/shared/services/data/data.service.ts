import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataService {
    public subject = new BehaviorSubject<any>('Compact');

    setViewMode(mode: string) {
        this.subject.next({mode: mode});
    }
}
