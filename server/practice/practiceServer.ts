import path from "path";

type Consumer<T> = (t: T) => void;
type Supplier<T> = () => T;
const f: (consumer: Consumer<string>, supplier: Supplier<string>) => void = (consumer, supplier) => {
    consumer("hello");
    console.log(supplier());
}

f((value) => console.log(value), () => "TEST");

const consumer: Consumer<string> = console.log;
consumer("aaa");

const supplier: Supplier<string> = () =>"TEST";
console.log(supplier());

console.log(__dirname);
console.log(path.resolve());
console.log(path.relative(__dirname, "index.ejs"));
console.log(path.normalize(path.join(__dirname, "../../template", "index.ejs")));