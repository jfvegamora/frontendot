export enum Permisos{
    LECTURA = 'lectura',
    ESCRITURA = 'escritura'
}


export interface IUser{
    id: number;
    nombre: string;
    permisos: Permisos;
}