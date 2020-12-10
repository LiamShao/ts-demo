interface PersonB {
  name: string;
  // readonly name: string;
  age?: number; // 可有可无
  [propName: string]: any;
  say(): string;
}

// 接口的继承
interface Stu extends PersonB {
  student(): void;
}

// 使用接口定义函数
interface SayHi {
  (word: string): string;
}

const sss: SayHi = (word: string) => {
  return word;
};

const getPersonName = (person: PersonB): void => {
  console.log('person', person);
};

const setPersonName = (person: PersonB, name: string): void => {
  person.name = name;
};

const person = {
  name: 'tom',
  sex: 'male',
  say() {
    return 'hello';
  },
};

// 如果以自变量的形式传参数会报错，以变量形式则不会
// getPersonName({
//   name: 'tom',
//   sex: 'male'
// });
setPersonName(person, 'jerry');
getPersonName(person);

class user implements PersonB {
  name = 'liam';
  say() {
    return 'hi';
  }
}
