import React from 'react';



export function useIndexedDB(databaseName:any, version:any, storeName:any) {
    const [db, setDb] = React.useState<any>(null);
  
    React.useEffect(() => {
      const request = window.indexedDB.open(databaseName, version);
  
      request.onerror = (event:any) => {
        console.error('Error al abrir la base de datos', event.target.errorCode);
      };
  
      request.onsuccess = (event:any) => {
        const db = event.target.result;
        setDb(db);
      };
  
      request.onupgradeneeded = (event:any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      };
    }, [databaseName, version, storeName]);
  
    const addToStore = async (item:any) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      await store.add(item);
    };
  
    const updateInStore = async (item:any) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      await store.put(item);
    };
  
    const deleteFromStore = async (id:any) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      await store.delete(id);
    };

    const getAllFromStore = (callback:any) => {
        if(db){
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            request.onsuccess = () => {
              callback(request.result);
            };
        }
      };
  
    return { db, addToStore, updateInStore, deleteFromStore,getAllFromStore };
  }
  


