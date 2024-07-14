export class BaseHero {
    #age: number;
    constructor(age: number) {
        this.#age = age;
    }
    public getAge(): number {
        return this.#age;
    }
}
export class Hero extends BaseHero {
    #name: string;
    constructor(name: string, age: number) {
        super(age);
        this.#name = name;
    }
    public getName(): string {
        return this.#name;
    }
}
export class NullPointerException extends Error {
    constructor(message: string) {
        super(message);
    }
}
export class UndefindException extends Error {
    constructor(message: string) {
        super(message);
    }
}