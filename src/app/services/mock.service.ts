import { faker } from '@faker-js/faker';
import { Position, TableData } from '../types';

function generateMockData(numEntries: number): TableData[] {
  const entries: TableData[] = [];

  for (let i = 0; i < numEntries; i++) {
    const entry: TableData = {
      fullName: faker.person.fullName(),
      salary: 80000,
      email: faker.internet.email(),
      position: Position.DEVOPS,
      creationDate: new Date()
    };
    entries.push(entry);
  }

  return entries;
}

export const TableMockData: TableData[] = [
  ...generateMockData(100),
]