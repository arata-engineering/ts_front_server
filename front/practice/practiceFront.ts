const animalArray: readonly string[] = ["ant", "giraffe", "gorirra"];

const map: ReadonlyMap<string, string> = new Map([
  ["name", "tanaka"],
  ["age", "22"]
]);

for (const animal of animalArray) {
  console.log(animal);
}