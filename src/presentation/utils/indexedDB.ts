//? CREANDO BASE DE DATOS LOCAL PARA RESERVA DE ARMAZONES

const dbName     = "ReservaArmazones";
const dbversion  = 1;

let db:IDBDatabase;


//?ABRIR-CREAR DATABASE
export const openDatabase = ():void => {
    const request = window.indexedDB.open(dbName, dbversion);

    request.onerror = function(event:Event){
        console.log("Error al abrir base de datos", (event.target as IDBRequest).error)
    };

    request.onsuccess = function(event:Event){
        console.log("Accediendo a la base de datos");
        db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
    };

    request.onupgradeneeded = function(event:IDBVersionChangeEvent){
        const db            = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        const objectStore   = db.createObjectStore("armazones", {keyPath: "armazones_db"});
        objectStore.createIndex("cantidad", "cantidad", {unique:false});  
        objectStore.createIndex("cod_armazon", "cod_armazon", {unique:true});  
        
        console.log("Estructura de la base de datos creada correctamente");
    }

};


//?AGREGAR ARMAZONES A DATABASE
export const setArmazones = (codArmazon:string, cantidad:number):Promise<string> => {
    return new Promise((resolve, reject):any => {
        const transaction: IDBTransaction = db.transaction(["armazones"], "readwrite");
        const objectStore: IDBObjectStore = transaction.objectStore("armazones");
        
        const request: IDBRequest<IDBValidKey> = objectStore.get(codArmazon);


         request.onsuccess = function(event:Event){
            const existingData = (event.target as IDBRequest).result;
            
            if(existingData){
                const updatedData = {
                    ...existingData,
                    cantidad: existingData.cantidad - cantidad
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
                const newData = {
                    armazones_db : codArmazon,
                    cantidad    :cantidad
                };
                console.log(newData)
                const addRequest: IDBRequest<IDBValidKey> = objectStore.add(newData);

                addRequest.onsuccess = function(_event:Event){
                    console.log("Datos agregados a la base de datos correctamente");
                    resolve("Datos agregados a la base de datos correctamente");
                };

                addRequest.onerror = function(event:Event){
                    console.error("Error al agregar datos:", (event.target as IDBRequest).error);
                    reject((event.target as IDBRequest).error);
                }
            }
        };
        request.onerror = function(event:Event){
            console.error("Error al agregar datos:", (event.target as IDBRequest).error);
            reject((event.target as IDBRequest).error)
        }
    })
};



//?OBTENER ARMAZONES DE BASE DE DATOS
export const getArmazones = ():Promise<any[]> => {
    return new Promise((resolve,reject) => {
        const transaction: IDBTransaction           = db.transaction(["armazones"], "readonly");
        const objectStore: IDBObjectStore           = transaction.objectStore("armazones");
        const request    : IDBRequest<IDBValidKey[]>  = objectStore.getAll(); 
        

        request.onsuccess = function(event:Event){
            const data:any[] = (event.target as IDBRequest).result;
            console.log("Datos obtenidos", data);
            resolve(data);
        };

        request.onerror = function(event: Event) {
            console.error("Error al obtener datos:", (event.target as IDBRequest).error);
            reject((event.target as IDBRequest).error);
          };
    })
};


//?LIMPIAR INDEXED DB 
export const clearBaseDatos = ():Promise<string> => {
    return new Promise((resolve, reject) => {
        const transaction: IDBTransaction = db.transaction(["armazones"], "readwrite");
        const objectStore: IDBObjectStore = transaction.objectStore("armazones");
        const request:IDBRequest = objectStore.clear();

        request.onsuccess = function(_event:Event){
            console.log('Base de datos vaciada correctamente')
            resolve('Base de datos vaciada correctamente');
        };

        request.onerror = function(event:Event){
            console.error("Error al vaciar la base de datos:", (event.target as IDBRequest).error);
            reject((event.target as IDBRequest).error);      
        }
    });
};



