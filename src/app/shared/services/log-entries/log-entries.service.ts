import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import logEntries from '../../mockup-data/log-entries';

@Injectable()
export class LogEntriesService {
    constructor(public http: HttpClient) {
    }

    private DEBUG_FAKE_WAIT_TIME_MS = 500;

    /**
     * Retrieves a debug token.
     *
     * @returns {Promise<any>}
     */
    loginDebug(): Promise<any> {
        // todo remove (temporary until we can't access the API
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve('mockup-token');
            }.bind(this), this.DEBUG_FAKE_WAIT_TIME_MS);
        });

        return new Promise((resolve, reject) => {
            this.http.get(environment.api_base_url)
                .subscribe((res) => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    /**
     * Retrieves a single log entry from the database.
     *
     * @param id
     * @returns {Promise<>}
     */
    getLogEntry(id: number): Promise<any> {
        // todo remove (temporary until we can't access the API
        const logEntriesMockupData = logEntries;
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve(logEntriesMockupData[0]);
            }.bind(this), this.DEBUG_FAKE_WAIT_TIME_MS);
        });

        return new Promise((resolve, reject) => {
            this.http.get(environment.api_base_url + 'api/single/entry/' + id)
                .subscribe((res) => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    /**
     * Retrieves a file from a single log entry.
     * Works only when there is a file attached to the log entry.
     *
     * @param id
     * @returns {Promise<any>}
     */
    getLogEntryFile(id: number): Promise<any> {
        // todo remove (temporary until we can't access the API
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(null);
            }.bind(this), this.DEBUG_FAKE_WAIT_TIME_MS);
        });

        return new Promise((resolve, reject) => {
            this.http.get(environment.api_base_url + 'api/single/entry/' + id, {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            })
                .subscribe((res) => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    /**
     * Retrieves a file from a single log entry.
     * Works only when there is a file attached to the log entry.
     *
     * @returns {Promise<any>}
     */
    getAllLogEntries(): Promise<any> {
        // todo remove (temporary until we can't access the API
        const logEntriesMockupData = logEntries;
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(logEntriesMockupData);
            }.bind(this), this.DEBUG_FAKE_WAIT_TIME_MS);
        });

        return new Promise((resolve, reject) => {
            this.http.get(environment.api_base_url + 'api/all/entries', {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            })
                .subscribe((res) => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    /**
     * Creates a log entry and adds it into the database.
     *
     * @returns {Promise<any>}
     */
    crateLogEntry(APIParameter): Promise<any> {
        // todo remove (temporary until we can't access the API
        const logEntriesMockupData = logEntries;
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(logEntriesMockupData[0]);
            }.bind(this), this.DEBUG_FAKE_WAIT_TIME_MS);
        });

        return new Promise((resolve, reject) => {
            this.http.post(environment.api_base_url + 'api/post/entry/data', APIParameter, {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            })
                .subscribe((res) => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    /**
     * Uploads a file to the log entry.
     *
     * @returns {Promise<any>}
     */
    uploadFileToLogEntry(id: number, APIParameter): Promise<any> {
        // todo remove (temporary until we can't access the API
        const logEntriesMockupData = logEntries;
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(logEntriesMockupData[0]);
            }.bind(this), this.DEBUG_FAKE_WAIT_TIME_MS);
        });

        return new Promise((resolve, reject) => {
            this.http.post(environment.api_base_url + 'api/upload/' + id, APIParameter, {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            })
                .subscribe((res) => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    /**
     * Used for the user to retrieve an token for the user.
     *
     * @returns {Promise<any>}
     */
    login(APIParameter): Promise<any> {
        // todo remove (temporary until we can't access the API
        const logEntriesMockupData = logEntries;
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(logEntriesMockupData[0]);
            }.bind(this), this.DEBUG_FAKE_WAIT_TIME_MS);
        });

        return new Promise((resolve, reject) => {
            this.http.post(environment.api_base_url + 'api/user/login/info', APIParameter, {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            })
                .subscribe((res) => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }
}
