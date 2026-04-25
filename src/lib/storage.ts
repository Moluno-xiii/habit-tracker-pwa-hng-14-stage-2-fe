class StorageService {
  private available: boolean = typeof window !== "undefined";

  storeData<T>(key: string, data: T): void {
    if (!this.available) return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  getStoredData<T>(key: string): T | null {
    if (!this.available) return null;
    const storedItem = localStorage.getItem(key);
    return storedItem ? (JSON.parse(storedItem) as T) : null;
  }

  clearStoredData(key: string): void {
    if (!this.available) return;
    localStorage.removeItem(key);
  }
}

const storageService = new StorageService();

export default storageService;
