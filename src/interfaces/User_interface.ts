export enum Permisos {
  LECTURA = "lectura",
  ESCRITURA = "escritura",
}

interface Item {
  id: string;
  name: string;
  field1: string;
  field2: string;
  field3: string;
}

export type DataStructure = Item[];

export interface IUser {
  id: number;
  nombre: string;
  nickName: string;
  cargo: number;
  telefono: string;
  correo: string;
  estado: number;
  permisos: Permisos;
}
