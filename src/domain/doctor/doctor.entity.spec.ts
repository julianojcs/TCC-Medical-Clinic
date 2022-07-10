import crypto from 'crypto';
import { Doctor, DoctorProps, defaultShift } from "./doctor.entity";

let doctorProps: DoctorProps
let doctor: Doctor

beforeEach(() => {
  doctorProps = {
    id: crypto.randomUUID(),
    name: "john doe",
    email: "John@DOE.com",
    phones: ["(11)99999-9999"],
    speciality: "cardiologist"
  }
})

describe('Create Doctor Tests', () => {
  test('constructor', () => {
    doctor = Doctor.create(doctorProps);

    expect(doctor.id).toBeDefined();
    expect(doctor.name).toBe('John Doe');
    expect(doctor.email).toBe('john@doe.com');
    expect(doctor.phones[0]).toBe('11999999999');
    expect(doctor.role).toBe('doctor');
    expect(doctor.speciality).toBe('cardiologist');
    expect(doctor.shift).toStrictEqual(defaultShift);
    expect(doctor.isActive).toBe(true);
  })

  test('constructor with shiftTimePeriod and shiftTimePeriod', () => {
    doctor = new Doctor({
      ...doctorProps,
      shift: {
        timePeriod: ['morning', 'afternoon'],
        weekDays: ['monday', 'tuesday']
      }
    });

    expect(doctor.shift).toStrictEqual({
      timePeriod: ['morning', 'afternoon'],
      weekDays: ['monday', 'tuesday']
    });
  })
})

describe('Update Doctor Tests', () => {
  test('Speciality update method', () => {
    doctor = new Doctor (doctorProps);

    doctor.updateSpeciality('neurologist');
    expect(doctor.speciality).toBe('neurologist');
  })
  test('Shift update method', () => {
    doctor = new Doctor (doctorProps);

    doctor.updateShift({
      timePeriod: ['afternoon'],
      weekDays: ['sunday', 'tuesday', 'wednesday', 'friday']
    });
    doctor.updateShiftWeekDays(["tuesday", "friday"]);
    expect(doctor.shift).toStrictEqual({
      timePeriod: ['afternoon'],
      weekDays: ['tuesday', 'friday']
    });
  })
  test('Shift update TimePeriod and WeekDays methods', () => {
    doctor = new Doctor (doctorProps);

    doctor.updateShiftTimePeriod(["afternoon"]);
    doctor.updateShiftWeekDays(["tuesday", "wednesday", "friday"]);
    expect(doctor.shift).toStrictEqual({
      timePeriod: ['afternoon'],
      weekDays: ['tuesday', 'wednesday', 'friday']
    });
  })
  test('Activate and deactivate methods', () => {
    doctor = new Doctor (doctorProps);

    doctor.deactivate();
    expect(doctor.isActive).toBe(false);
    doctor.activate();
    expect(doctor.isActive).toBe(true);
  })
});

describe('Doctor toJSON Tests', () => {
  test('toJSON method', () => {
    doctor = new Doctor (doctorProps);
    expect(doctor.toJSON()).toStrictEqual({
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      phones: doctor.phones,
      role: doctor.role,
      shift: doctor.shift,
      speciality: doctor.speciality,
      isAdmin: doctor.isAdmin,
      isActive: doctor.isActive
    });
  });
});
