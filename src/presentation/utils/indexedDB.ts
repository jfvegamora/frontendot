//? CREANDO BASE DE DATOS LOCAL PARA RESERVA DE ARMAZONES

import { punto_venta } from "./signalStateOT";

const dbName     = "ReservaArmazones";
const dbversion  = 5;

export let db:IDBDatabase;



//?ABRIR-CREAR DATABASE
export const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, dbversion);

        request.onerror = function(event: Event) {
            console.error("Error al abrir base de datos", (event.target as IDBRequest).error);
            reject((event.target as IDBRequest).error);
        };

        request.onsuccess = function(event: Event) {
            const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
            console.log("Accediendo a la base de datos");
            resolve(db);
        };

        request.onupgradeneeded = function(event: IDBVersionChangeEvent) {
            const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
            const objectStore = db.createObjectStore("reserva_armazones", { keyPath: "cod_armazon" });

            objectStore.createIndex("cod_armazon", "cod_armazon", { unique: true });
            objectStore.createIndex("proyecto", "proyecto", { unique: false });
            objectStore.createIndex("punto_venta", "punto_venta", { unique: false });

            const clienteReservaStore = db.createObjectStore("reserva_armazones_beneficiarios", {keyPath:"rut_beneficiario"});
            clienteReservaStore.createIndex("rut_beneficiario","rut_beneficiario", {unique:true});
            clienteReservaStore.createIndex("proyecto","proyecto", {unique:false});
   


            console.log("Estructura de la base de datos creada correctamente");
        };
    });
};

//?AGREGAR ARMAZONES A DATABASE
export const setReservaBeneficiario = (db:IDBDatabase,jsonData:any, userID:string):Promise<string> => {
    return new Promise((resolve, reject):any => {
        const transaction: IDBTransaction = db.transaction(["reserva_armazones_beneficiarios"], "readwrite");
        const objectStore: IDBObjectStore = transaction.objectStore("reserva_armazones_beneficiarios");
        
        const request: IDBRequest<IDBValidKey> = objectStore.get(jsonData.rut_beneficiario);
        
        console.log(request)
        console.log(jsonData)


         request.onsuccess = function(event:Event){
            const existingData = (event.target as IDBRequest).result;
            
            if(existingData){
                console.log(existingData)
                reject("Rut ya existe en un registro previo");
                
            }
            const data = {
                "proyecto"           : jsonData.proyecto,
                "punto_venta"        : `${punto_venta.value}`,
                "rut_beneficiario"   : jsonData.rut_beneficiario,
                "tipo_anteojo"       : jsonData.tipo_anteojo,
                "dp"                 : jsonData.dp,
                "armazon_1"          : jsonData.Armazon1,
                "armazon_2"          : jsonData.Armazon2,
                "armazon_3"          : jsonData.Armazon3,
                "usuario"            : userID
            }
            const newBeneficiario = objectStore.put(data);
            newBeneficiario.onsuccess = function(_event:Event){
                    resolve("Beneficiario guardado Correctamente");
            };
                
            newBeneficiario.onerror = function(event:Event){
                    console.log("Error al actualizar datos", (event.target as IDBRequest).error);
                    reject((event.target as IDBRequest).error);
                    
            };

        };
        request.onerror = function(event:Event){
            console.error("Error al agregar datos:", (event.target as IDBRequest).error);
            reject((event.target as IDBRequest).error)
            db.close()
        }
    })
};



//?AGREGAR ARMAZONES A DATABASE
export const setArmazones = (db:IDBDatabase,data:any, reservaJSON:any,firstTime?:boolean, posicionArmazon?:string, tipo_anteojo?:string):Promise<string> => {
    return new Promise((resolve, reject):any => {
        const transaction: IDBTransaction = db.transaction(["reserva_armazones"], "readwrite");
        const objectStore: IDBObjectStore = transaction.objectStore("reserva_armazones");
        
        
        console.log(objectStore)
        console.log(data)
        const request: IDBRequest<IDBValidKey> = objectStore.get(data.codArmazon);
        
        console.log(request)

        request.onsuccess = function(event:Event){
            const existingData = (event.target as IDBRequest).result;
            
            if(existingData){
                console.log(existingData)
                if(existingData["stock_disponible"] <= 0){
                    reject(`Armazon ${existingData["cod_armazon"]} sin stock disponible para reservar`)
                }

                const updatedData = {
                    ...existingData,
                    stock_disponible: posicionArmazon === '1' ? (parseInt(existingData.stock_disponible) - 1) : (tipo_anteojo === '3' ? (parseInt(existingData.stock_disponible) - 1) : (existingData.stock_disponible)),
                    stock_reservado:  posicionArmazon === '1' ? (parseInt(existingData.stock_reservado)  + 1) : (tipo_anteojo === '3' ? (parseInt(existingData.stock_reservado) + 1) : (existingData.stock_reservado) ) 
                };

                const updateRequest = objectStore.put(updatedData);

                updateRequest.onsuccess = function(_event:Event){
                    console.log("Cantidad actualizada correctamente");
                    resolve("Cantidad actualizada correactamente");
                  
                };

                updateRequest.onerror = function(event:Event){
                    console.log("Error al actualizar datos", (event.target as IDBRequest).error);
                    reject((event.target as IDBRequest).error);
                    
                };

            }else{
                if(firstTime){
                    // console.log(data)
                    // console.log(reservaJSON)
                    
                    const newData = {
                        cod_armazon         : data.codArmazon,
                        stock_disponible    : parseInt(data.cantidad),
                        stock_reservado     : 0,
                        proyecto            : reservaJSON["proyecto"],
                        punto_venta         : reservaJSON["punto_venta"],
                        aro                 : data["aro"],
                        puente              : data["puente"],
                        diagonal            : data["diagonal"]
                    };
    
                    // console.log(newData)
                    const addRequest: IDBRequest<IDBValidKey> = objectStore.add(newData);
    
                    addRequest.onsuccess = function(_event:Event){
                        console.log("Datos agregados a la base de datos correctamente");
                        resolve("Datos agregados a la base de datos correctamente");
                      
                    };
    
                    addRequest.onerror = function(event:Event){
                        console.log(event)
                        console.error("Error al agregar datos:", (event.target as IDBRequest).error);
                        reject((event.target as IDBRequest).error);
                    }
                }
                console.log(`No existe datos para el armazon:${data.codArmazon}`)
                reject(`No existe datos para el armazon:${data.codArmazon}`)
          

            }
        };
        request.onerror = function(event:Event){
            console.error("Error al agregar datos:", (event.target as IDBRequest).error);
            reject((event.target as IDBRequest).error)
            db.close()
        }
    })
};




//?OBTENER ARMAZONES DE BASE DE DATOS
export const getArmazones = (db:IDBDatabase):Promise<any[]> => {
    return new Promise((resolve,reject) => {
        const transaction: IDBTransaction             = db.transaction(["reserva_armazones"], "readonly");
        const objectStore: IDBObjectStore             = transaction.objectStore("reserva_armazones");
        const request    : IDBRequest<IDBValidKey[]>  = objectStore.getAll(); 

        request.onsuccess = function(event:Event){
            const data:any[] = (event.target as IDBRequest).result;
            console.log("Datos obtenidos", data);
            resolve(data);
         
        };

        request.onerror = function(event: Event) {
            console.error("Error al obtener datos:", (event.target as IDBRequest).error);
            reject((event.target as IDBRequest).error);
            db.close()
          };
    })
};


//?VALIDA EL DIAMETRO EFECTIVO DE LOS ARMAZONES ALMACENADOS LOCALMENTE
export const validateLocalArmazon = (db:IDBDatabase, data:any) => {
    return new Promise((resolve, reject) => {
        const transaction:IDBTransaction              = db.transaction(["reserva_armazones"], "readonly");
        const objectStore:IDBObjectStore              = transaction.objectStore("reserva_armazones");
        const request: IDBRequest<IDBValidKey>        = objectStore.get(data["codArmazon"]);

        request.onsuccess = function(event:Event){
            const resultArmazon:any  = (event.target as IDBRequest).result
            const diametroEfectivo = (resultArmazon["aro"] + resultArmazon["puente"] + resultArmazon["diagonal"] - parseInt(data["dp"])) <= 65
            resolve(diametroEfectivo)

        }   

        request.onerror = function(event:Event){
            console.log((event.target as IDBRequest).error)
            reject((event.target as IDBRequest).error)
            db.close()
        }
    })
}




//?Obtener datos de beneficiario
export const getBeneficiarios = (db:IDBDatabase):Promise<any[]> => {
    return new Promise((resolve, reject)=>{
        const transaction:IDBTransaction              = db.transaction(["reserva_armazones_beneficiarios"], "readonly");

        const objectStore:IDBObjectStore              = transaction.objectStore("reserva_armazones_beneficiarios");
        const request    : IDBRequest<IDBValidKey[]>  = objectStore.getAll();

        console.log(request)

        request.onsuccess = function(event:Event){
            const dataBeneficiario:any[] = (event.target as IDBRequest).result;
            console.log(dataBeneficiario)
            resolve(dataBeneficiario);
        };

        request.onerror = function(event:Event){
            console.error("Error al obtener datos:", (event.target as IDBRequest).error);
            reject((event.target as IDBRequest).error);
            db.close()
        }
    })
}



//?LIMPIAR INDEXED DB 
export const clearBaseDatos = (db:IDBDatabase):Promise<string> => {
    return new Promise((resolve, reject) => {
        const transaction_armazones     : IDBTransaction = db.transaction(["reserva_armazones"], "readwrite");
        const transaction_beneficiarios : IDBTransaction = db.transaction(["reserva_armazones_beneficiarios"], "readwrite");
        
        const objectStore_armazones     : IDBObjectStore = transaction_armazones.objectStore("reserva_armazones");
        const objectStore_beneficiarios : IDBObjectStore = transaction_beneficiarios.objectStore("reserva_armazones_beneficiarios");
        
        
        const request_armazones:IDBRequest     = objectStore_armazones.clear();
        const request_beneficiario:IDBRequest  = objectStore_beneficiarios.clear();

        request_armazones.onsuccess = function(_event:Event){
            console.log(request_beneficiario)
            resolve('Base de datos vaciada correctamente');
        };

        request_armazones.onerror = function(event:Event){
            console.error("Error al vaciar la base de datos:", (event.target as IDBRequest).error);
            reject((event.target as IDBRequest).error);      
        }
    });
};


export const isExistArmazon = (db:IDBDatabase, codArmazon:any[]):Promise<any> => {
    return new Promise((resolve,reject) => {
        const transaction: IDBTransaction             = db.transaction(["reserva_armazones"], "readonly");
        const objectStore: IDBObjectStore             = transaction.objectStore("reserva_armazones");
        const request    : IDBRequest<IDBValidKey[]>  = objectStore.getAll(); 

        request.onsuccess = function(event:Event){
            const data:any[] = (event.target as IDBRequest).result;
            console.log("Datos obtenidos", data);

            const filteredData = data.filter(item => codArmazon.includes(item.cod_armazon));
            const missingCodArmazon = codArmazon.filter(cod => !data.some(item => item.cod_armazon === cod));


            console.log(missingCodArmazon)
            console.log(filteredData)

            //? if length 3 retornar true caso contrario false
            const response = {
                value        : filteredData.length === 3 ? true : false,
                missingData  : codArmazon.filter(cod => !data.some(item => item.cod_armazon === cod)).join(',')
            }

            resolve(response);
         
        };

        request.onerror = function(event: Event) {
            console.error("Error al obtener datos:", (event.target as IDBRequest).error);
            reject((event.target as IDBRequest).error);
            db.close()
          };
    })
};

export const isExistBeneficiario = (db:IDBDatabase, rut_beneficiario:string):Promise<boolean> => {
    return new Promise((resolve, reject)=> {
        const transaction: IDBTransaction           = db.transaction(["reserva_armazones_beneficiarios"], "readonly");
        const objectStore:IDBObjectStore            = transaction.objectStore("reserva_armazones_beneficiarios");
        const request    : IDBRequest<IDBValidKey>  = objectStore.get(rut_beneficiario);

        console.log(request);

        request.onsuccess = function(event:Event){

            const data = (event.target as IDBRequest).result;

            console.log(data)
            console.log(data !== undefined)

            if(data !== undefined){
                console.log(true)
                resolve(true);
            }else{
                console.log(false)
                resolve(false);
            }

            resolve(false)
        }

        request.onerror = function(event:Event){
            console.log((event.target as IDBRequest).error)
            reject(false)
            db.close()
        }
    })
}