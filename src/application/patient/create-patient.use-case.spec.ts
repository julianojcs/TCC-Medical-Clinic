import { PatientProps } from '../../domain/user/patient/patient.entity';
import { transformName, transformEmail, transformPhones } from '../../util';
import { PatientInMemoryRepository } from '../../infra/db/in-memory/patient/patient-in-memory.repository';
import { CreatePatientUseCase } from './create-patient.use-case';

const patientProps: PatientProps = {
  name: 'john doe',
  email: 'John@doe.com',
  phones: ['(11)99999-9999'],
  isActive: true,
};
const repository = new PatientInMemoryRepository();

describe('CreatePatientUseCase Tests', () => {
  it('should create a new patient', async () => {
    const createPatientUseCase = new CreatePatientUseCase(repository);
    const result = await createPatientUseCase.execute(patientProps);
    expect(repository.items).toHaveLength(1);
    expect(result).toStrictEqual({
      id: repository.items[0].id,
      name: transformName(repository.items[0].name),
      email: transformEmail(repository.items[0].email),
      phones: transformPhones(repository.items[0].phones),
      healthPlan: null,
      isActive: true,
    });
  });
});
