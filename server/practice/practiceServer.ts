type Human = {name: string};
type Animals = {species: string};

function getName(human: Human): string {
    return human.name;
}
function getSpecies(animal: Animals): string {
    return animal.species;
}

const func = Math.random() < 0.5 ? getName : getSpecies;
const p: Human & Animals = {
    name: "taro",
    species: ""
}