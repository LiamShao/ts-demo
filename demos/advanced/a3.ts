interface Person {
  name: string;
  age: number;
  gender: string;
}

class Teacher {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

const t1 = new Teacher({
  name: 'liam',
  age: 18,
  gender: 'male',
});
const age = t1.getInfo('age');
console.log();
