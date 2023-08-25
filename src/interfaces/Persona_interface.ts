export interface IPerson{
    id:number;
    nombre:string;
    direccion:string;
    region_nombre:string;
    provincia_nombre:string;
    comuna_nombre:string;
    telefono:number;
    correo:string;
    sexo:string;
    fecha_nacimiento:Date | string;
    comuna?: number | string | undefined;
    rut:number | string ;
    anteojos:string;
    estado:number;
    dominio_ingles:number
}


// ========================PESONAS=======================

export interface IRegiones{
    id:number;
    nombre: string;
    oridinal: string
}


export interface IProvincias{
    id:number;
    nombre:string;
    region:number
}


export interface IComunas{
    id:number;
    nombre: string;
    provincia:number
}



