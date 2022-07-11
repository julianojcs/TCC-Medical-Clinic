import crypto from 'crypto';
import { transformName, transformEmail, transformPhones } from '../../util';

export interface LabProps {
  id?: string;
  name: string;
  address?: string | null;
  email?: string | null;
  phones?: string[];
  isActive?: boolean;
}

export class Lab implements LabProps {
  // public props: Required<LabProps>
  private _id: string;
  private _name: string;
  private _address?: string | null = null;
  private _email: string | null = null;
  private _phones: string[] = [];
  private _isActive: boolean = true;

  constructor(props: LabProps) {
    this._id = crypto.randomUUID();
    this._name = transformName(props.name);
    this._address = props.address;
    this._email = props?.email ? transformEmail(props.email) : null;
    this._phones = transformPhones(props.phones);
    this._isActive = props?.isActive === false ? false : true;
  }

  static create(props: LabProps): Lab {
    return new Lab(props);
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  private set name(value: string) {
    this._name = transformName(value);
  }
  get address(): string | null {
    return this._address || null;
  }
  private set address(value: string | null) {
    this._address = value || null;
  }
  get email(): string | null {
    return this._email;
  }
  private set email(value: string | null) {
    this._email = value ? transformEmail(value) : null;
  }
  get phones(): string[] {
    return this._phones;
  }
  private set phones(value: string[]) {
    this._phones = transformPhones(value);
  }
  get isActive(): boolean {
    return this._isActive === false ? false : true;
  }
  private set isActive(value: boolean) {
    this._isActive = value;
  }

  updateName(value: string) {
    this.name = transformName(value);
  }
  updateAddress(value: string) {
    this.address = value;
  }
  updateEmail(value: string) {
    this.email = transformEmail(value);
  }
  updatePhones(value: string[]) {
    this.phones = transformPhones(value);
  }
  deactivate() {
    this.isActive = false;
  }
  activate() {
    this.isActive = true;
  }
  toJSON(): LabProps {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      email: this.email,
      phones: this.phones,
      isActive: this.isActive,
    };
  }
}
