import { mockVehicles } from '../data/vehicles.mock'
import type { Vehicle } from "../interfaces/vehicle";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("double-se-inventory", 1);
    request.onupgradeneeded = () =>
      request.result.createObjectStore("vehicles", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const vehicleService = {
  async getVehicles(): Promise<Vehicle[]> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("vehicles", "readonly");
      const request = tx.objectStore("vehicles").getAll();
      tx.oncomplete = () => {
        db.close();
        resolve([...mockVehicles, ...request.result as Vehicle[]]);
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  },
  async removeLocalVehicle(id: string): Promise<void> {
    if (!id.startsWith("local-"))
      throw new Error("Only local records can be removed.");
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("vehicles", "readwrite");
      tx.objectStore("vehicles").delete(id);
      tx.oncomplete = () => {
        db.close();
        window.dispatchEvent(new Event("inventory-updated"));
        resolve();
      };
      tx.onabort = () => {
        db.close();
        reject(tx.error);
      };
    });
  },
  async addVehicle(vehicle: Vehicle): Promise<void> {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("vehicles", "readwrite");
      tx.objectStore("vehicles").add(vehicle);
      tx.oncomplete = () => {
        db.close();
        window.dispatchEvent(new Event("inventory-updated"));
        resolve();
      };
      tx.onabort = () => {
        db.close();
        reject(tx.error);
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  },
};
