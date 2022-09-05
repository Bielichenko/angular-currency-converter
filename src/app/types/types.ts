export interface RatesDataFromServer {
  table: string,
  rates: {[key: string]: number},
  lastupdate: string,
};

