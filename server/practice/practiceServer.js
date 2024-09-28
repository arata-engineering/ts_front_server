console.log("===START===");
var animalArray = ["wada", "tanaka", "wada"];
var uniqueAnimalArray = Array.from(new Set(animalArray));
uniqueAnimalArray.forEach(function (animal) { return console.log(animal); });
