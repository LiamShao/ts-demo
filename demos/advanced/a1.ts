interface Bird {
  fly: boolean;
  sing: () => void;
}

interface Dog {
  fly: boolean;
  bark: () => void;
}

// 联合类型
function trainAnimal(animal: Bird | Dog) {
  // 类型保护 1 使用断言
  if (animal.fly) {
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }
  // 类型保护 2
  // if ('sing' in animal) {}
  // 类型保护 3
  // typeof
  // 类型保护 4 只有class类可以使用
  // a instanceof Alphabet
}
