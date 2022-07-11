import { Lab } from './';

// Dependence Invertion
export interface LabRepositoryInterface {
  insert(lab: Lab): Promise<void>;
  findAll(): Promise<Lab[]>;
}
