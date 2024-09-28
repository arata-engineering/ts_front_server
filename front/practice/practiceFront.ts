const animalArray: ReadonlyArray<string> = ["wada", "tanaka", "wada"];
const uniqueAnimalArray: ReadonlyArray<string> = [...new Set(animalArray)];
uniqueAnimalArray.forEach(animal => console.log(animal));