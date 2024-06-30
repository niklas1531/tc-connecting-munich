export interface Chat {
  userType: userType;
  message: string;
  time: string;
}

export enum userType {
  SYSTEM = 'System',
  USER = 'Nutzer',
}
