import IData from "./IData";

export default interface IHeadCells {
  ID: keyof IData;
  ColumnName: string;
}
