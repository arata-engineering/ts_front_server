type BaseAnimal = {
    name1: string;
    status: {
        hp: number;
        mp: number;
    }
}
type Animal = BaseAnimal & {
    type: string;
}
const baseAnimal: BaseAnimal = {
    name1: "taro",
    status: {
        hp: 12,
        mp: 39,
    }
}
const animal: Animal = {
    ...baseAnimal,
    type: "sea",
}

/** 引数の分割代入 */
const animalExe: ({name1}: BaseAnimal) => void = ({name1}) => console.log(name1);
animalExe(animal);

function aaa({name1}: BaseAnimal): void {
    console.log(name1);
}
aaa(animal);

/** arrayの分割代入 */
function arrFunc([first, second]: string[]): void {
    console.log(`${first} : ${second}`);
}
const arr: string[] = ["1", "2", "3"];
arrFunc(arr);

/** tupleの分割代入 */
function tupleFunc([first, second]: [string, number]): void {
    console.log(`${first} : ${second}`);
}
const tuple: [string, number] = ["1", 3];
tupleFunc(tuple);
