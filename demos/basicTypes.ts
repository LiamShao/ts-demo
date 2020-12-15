// 基础类型: boolean string number undefined null void symbol Date
// 对象类型: class interface function {} []
interface Point {
  x: number;
  y: number;
}

const p: Point = {
  x: 1,
  y: 1,
};

function add(first: number, second: number): number {
  return first + second;
}

const hello = function (): void {
  // return '';
  console.log('hello');
};

function getErr(): never {
  throw new Error();
  // console.log('err');
}

function reduce({ first, second }: { first: number; second: number }): number {
  return first - second;
}
const res = reduce({ first: 2, second: 1 });

function getNumber({ first }: { first: number }) {
  return first;
}

let b: number | string = 123;
b = '123';

const numberArr: number[] = [1, 2, 3];
const arr: (number | string)[] = [1, '2', 3];
const strArr: string[] = ['123'];
const undefinedArr: undefined[] = [undefined];

// type alias
type User = {
  name: string;
  age: number;
};
const objArr: User[] = [
  {
    name: '',
    age: 1,
  },
];

class Person {
  sex: string = '';
  tall: number = 1;
}
const p1: Person[] = [
  new Person(),
  {
    sex: '',
    tall: 1,
  },
];

// 元组
const tupleA: [string, string, number] = ['', '', 3];
const tupleB: [string, string, number][] = [
  ['', '', 3],
  ['', '', 3],
];
