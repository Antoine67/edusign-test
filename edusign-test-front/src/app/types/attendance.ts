import { Student } from "./student";

export type Attendance = {
    students : Student[];
    id : number;
    name: string;
    start: string;
    end: string;
    date_created: string;
    date_updated: string;
}