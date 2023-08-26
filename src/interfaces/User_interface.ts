export enum Permisos {
  LECTURA = "lectura",
  ESCRITURA = "escritura",
}

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
