export enum PermisoTipo {
  LECTURA = "1",
  ESCRITURA_LECTURA = "2",
  
}

export interface IPermiso{
  id_opcion: number;
  opcion_nombre:string;
  permiso_tipo:PermisoTipo;
}

export interface IUser {
  id: number;
  nombre: string;
  nickName: string;
  cargo: number;
  telefono: string;
  correo: string;
  estado: number;
  permisos: {[key:string]: IPermiso[]}
  permisos_campos:any
}
