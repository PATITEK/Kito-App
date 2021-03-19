import { IPageRequest } from "../global/global.DTO";

export interface IPageProduct extends IPageRequest{
  category_id;
  parish_id;
}