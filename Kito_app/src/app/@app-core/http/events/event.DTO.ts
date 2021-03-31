import { IPageRequest } from "../global";

export interface IPageEvent extends IPageRequest {
  cal_date?: string;
  parish_id?: string;
}