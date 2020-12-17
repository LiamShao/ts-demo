// 泛型 generic
function join<T>(a: T, b: T): T {
  console.log(`${a}${b}`);
  return a;
}
join<string>('1', '2');

// 数组的写法 下面两种相同
function AAA<T>(a: T[]) {
  return a;
}
AAA<string>(['']);

function BBB<T>(b: Array<T>) {
  return b;
}
BBB<string>(['']);

// 多个泛型
function CCC<T, P>(a: T, b: P) {
  console.log(`${a}${b}`);
}
CCC<number, string>(1, '2');

const DDD: <T>(param: T) => T = (d) => {
  return d;
};

// 使用泛型作为一个具体的类型注解
function EEE<T>(params: T) {
  return params;
}
const fn: <T>(params: T) => T = EEE;

// 类中的泛型
class Todo<T> {
  constructor(private data: T[]) {}
  getItem(index: number): T {
    return this.data[index];
  }
}
const todo = new Todo<string>(['a']);
todo.getItem(0);

// 泛型继承自定义接口
interface God {
  name: string;
}
class Man<T extends God> {
  constructor(private data: T[]) {}
  getItem(index: number): string {
    return this.data[index].name;
  }
}
const man = new Man<God>([{ name: 'a' }]);
man.getItem(0);

// 泛型约束
class Test<T extends number | string> {
  constructor(private data: T[]) {}
  getItem(index: number): T {
    return this.data[index];
  }
}
