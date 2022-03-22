export class StorageService {
	public get<T = any>(key: string): T | null {
		try {
			const data = localStorage.getItem(key);
			return data ? JSON.parse(data) : null;

		} catch (error) {
			return null;
		}
	}

	public set<T = any>(key: string, value: T): T {
		localStorage.setItem(key, JSON.stringify(value));
		return value;
	}

	public remove(key: string): void {
		localStorage.removeItem(key);
	}
}

const storageService = new StorageService();
export default storageService;
