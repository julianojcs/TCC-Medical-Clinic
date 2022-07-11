import { Patient, PatientProps } from "./patient.entity";
import crypto from 'crypto';

let patientProps: PatientProps;
let patient: Patient;

beforeEach(() => {
  patientProps = {
    id: crypto.randomUUID(),
    name: "john doe",
    email: "John@DOE.com",
    phones: ["(11)99999-9999"],
    // healthPlan: "Unimed Seguros",
  }
})

describe('Create Patient Tests', () => {
  test('constructor', () => {
    patient = Patient.create({...patientProps});
    expect(patient.id).toBeDefined();
    expect(patient.name).toBe('John Doe');
    expect(patient.email).toBe('john@doe.com');
    expect(patient.phones[0]).toBe('11999999999');
    expect(patient.healthPlan).toBe(null);
    expect(patient.isActive).toBe(true);
  })

  test('constructor with healthPlan', () => {
    patient = Patient.create({...patientProps, healthPlan: "Unimed Seguros"});
    expect(patient.id).toBeDefined();
    expect(patient.name).toBe('John Doe');
    expect(patient.email).toBe('john@doe.com');
    expect(patient.phones[0]).toBe('11999999999');
    expect(patient.healthPlan).toBe('Unimed Seguros');
    expect(patient.isActive).toBe(true);
  })
})

describe('Update Patient Tests', () => {
  test('All update methods', () => {
    patient = Patient.create({...patientProps});
    patient.updateName('juliano da costa');
    patient.updateEmail('APFJULIANO@GMAIL.COM');
    patient.updatePhones(['(27)98133-0708']);
    patient.updateHealthPlan("Bradesco Saúde");
    patient.deactivate();
    expect(patient.name).toBe('Juliano da Costa');
    expect(patient.email).toBe('apfjuliano@gmail.com');
    expect(patient.phones[0]).toBe('27981330708');
    expect(patient.isActive).toBe(false);
    expect(patient.healthPlan).toBe("Bradesco Saúde");
  })
  test('Activate, deactivate and deleteHealthPlan methods', () => {
    patient = Patient.create({...patientProps});
    patient.deleteHealthPlan();
    expect(patient.healthPlan).toBeNull();
    patient.deactivate();
    expect(patient.isActive).toBe(false);
    patient.activate();
    expect(patient.isActive).toBe(true);
  })
});

describe('Patient toJSON Tests', () => {
  test('toJSON method', () => {
    patient = Patient.create({...patientProps, healthPlan: "Unimed Seguros"});
    expect(patient.toJSON()).toStrictEqual({
      id: patient.id,
      name: patient.name,
      email: patient.email,
      phones: patient.phones,
      healthPlan: patient.healthPlan,
      isActive: patient.isActive
    });
  });
});
