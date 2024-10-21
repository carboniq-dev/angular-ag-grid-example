import { Injectable } from '@angular/core';
import { TableData } from '../types';
import { TableMockData } from './mock.service';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor() { }

  async fetchTableData(): Promise<TableData[]> {
    return TableMockData;
  }
}
