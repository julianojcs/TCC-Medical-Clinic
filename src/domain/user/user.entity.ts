import crypto from 'crypto';
import { transformName, transformEmail, transformPhones } from '../../util';


export interface UserProps {
  id?: string
  name: string
  email: string
  phones?: string[]
  isActive?: boolean
}

export class User implements UserProps {
  // public props: Required<UserProps>
  private _id: string;
  private _name: string;
  private _email: string;
  private _phones: string[] = [];
  private _isActive: boolean = true;

  constructor(props: UserProps) {
    this._id = crypto.randomUUID();
    this._name = transformName(props.name);
    this._email = transformEmail(props.email);
    this._phones = transformPhones(props.phones || []);
    this._isActive = props?.isActive || true;
  }

  static create(props: UserProps): User {
    return new User(props);
  }

  get id() {
    return this._id;
  }
  private set id(value: string) {
    this._id = value || crypto.randomUUID();
  }
  get name() {
    return this._name;
  }
  private set name(value: string) {
    this._name = transformName(value);
  }
  get email() {
    return this._email;
  }
  private set email(value: string) {
    this._email = transformEmail(value);
  }
  get phones() {
    return this._phones;
  }
  private set phones(value: string[]) {
    this._phones = transformPhones(value);
  }
  get isActive() {
    return this._isActive===false? false: true;
  }
  private set isActive(value: boolean) {
    this._isActive = value;
  }

  updateName(value: string) {
    this._name = transformName(value);
  }
  updateEmail(value: string) {
    this._email = transformEmail(value);
  }
  updatePhones(value: string[]) {
    this._phones = transformPhones(value);
  }
  deactivate() {
    this._isActive = false;
  }
  activate() {
    this._isActive = true;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phones: this.phones,
      isActive: this.isActive,
    };
  }
}

