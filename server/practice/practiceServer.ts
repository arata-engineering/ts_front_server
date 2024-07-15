import { BaseHero } from "./class/practiceServerClass";

const baseHero: BaseHero = new BaseHero(14);
console.log(baseHero.getAge());

console.log(typeof baseHero);

type StringNumber = string | number;
const a: StringNumber = "ee";
console.log(a.toUpperCase());

type F = {
    name: string,
    func: () => void
}
const o: F | undefined = undefined;
console.log(o);
