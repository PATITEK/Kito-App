import { IPageRequest } from "../global";

export interface IPageCalendar extends IPageRequest {
    cal_date?: string;
}
export interface Day {
    valueView: string;
    value: any;
}