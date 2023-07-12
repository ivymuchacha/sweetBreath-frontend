export interface APIRes<DataType = any> {
  status: 0 | 1;
  data: DataType;
}
