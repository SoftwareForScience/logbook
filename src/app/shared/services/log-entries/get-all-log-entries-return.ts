export interface LogEntry {
    run_id: number;
    created?: Date;
    subsystem: string;
    class: string;
    type: string;
    run: string;
    author: string;
    title: string;
    log_entry_text: string;
    follow_ups?: any;
    quality_flag?: any;
}
