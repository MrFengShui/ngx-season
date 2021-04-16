export class StorageUtils {

    private static instance: StorageUtils;

    storage!: Storage;

    constructor(type: number) {
        switch (type) {
            case 1: this.storage = window.localStorage; break;
            case 0: this.storage = window.sessionStorage; break;
        }
    }

    initialize(): void {
        if (this.getLanguage() === null) {
            this.setLanguage('en_US');
        }

        if (this.getMode() === null) {
            this.setMode('dark');
        }

        if (this.getTheme() === null) {
            this.setTheme('indigo');
        }
    }

    invalid(): boolean {
        return this.getLanguage() === null || this.getMode() === null || this.getTheme() === null;
    }

    getToken(): string | null {
        return this.storage.getItem('token');
    }

    setToken(token: string): void {
        this.storage.setItem('token', token);
    }

    getTheme(): string | null {
        return this.storage.getItem('theme');
    }

    setTheme(theme: string): void {
        this.storage.setItem('theme', theme);
    }

    getMode(): string | null {
        return this.storage.getItem('mode');
    }

    setMode(mode: string): void {
        this.storage.setItem('mode', mode);
    }

    getLanguage(): string | null {
        return this.storage.getItem('language');
    }

    setLanguage(language: string): void {
        this.storage.setItem('language', language);
    }

    getProfile(): any | null {
        let value: string | null = this.storage.getItem('profile');
        return value === null ? value : JSON.parse(value);
    }

    static newInstance(type: number = 1): StorageUtils {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new StorageUtils(type);
        }

        return this.instance;
    }

}