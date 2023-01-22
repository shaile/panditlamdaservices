/* eslint-disable prettier/prettier */
export interface Users {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly address: string;
  readonly country: string;
  readonly state: string;
  readonly city: string;
  readonly email: string;
  readonly phone: string;
  readonly avatar: any;
  readonly zip: string;
  readonly password: string;
  readonly createdBy: string;
  readonly createdOn: Date;
  readonly updatedBy: string;
  readonly updatedOn: Date;
}

export interface LoginPayload {
  readonly username: string;
  readonly password: any;
}
