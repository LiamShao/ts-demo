// 装饰器
// 装饰器本身是一个函数
// 装饰器接受的参数是一个构造函数

function testDecorator(constructor: any) {
  constructor.prototype.getName = () => {
    console.log('liam');
  };
}

@testDecorator
class Test {}
// 在类的代码加载完成时进行装饰，而不是在实例化的时候
const a = new Test();
const b = (new Test() as any).getName();

// 工厂模式
function testDecorator2(flag: boolean) {
  if (flag) {
    return function testDecorator(constructor: any) {
      constructor.prototype.getName = () => {
        console.log('shao');
      };
    };
  } else {
    return function testDecorator(constructor: any) {};
  }
}

// 将函数返回的函数作为装饰器
@testDecorator2(true)
class Test2 {}
const c = (new Test2() as any).getName();

// 对原构造函数进行扩展并覆盖
function testDecorator3<T extends new (...args: any[]) => any>(constructor: T) {
  return class extends constructor {
    name = 'yulu';
    // 当前这种在装饰器内扩展的函数不能被ts推断到
    getName() {
      return this.name;
    }
  };
}

@testDecorator3
class Test3 {
  constructor(public name?: string) {
    // name会被装饰器里的name覆盖
    console.log(name);
  }
}
const d = new Test3('lll');
// 此处不能在d上面直接调用getName，因为是在装饰器中扩展的，所以只能断言成any
console.log((d as any).getName());

// 下面这种方法可以解决 testDecorator3 中的不足之处
function testDecorator4() {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = 'sss';
      // 当前这种在装饰器内扩展的函数不能被ts推断到
      getName() {
        return this.name;
      }
    };
  };
}

const Test4 = testDecorator4()(
  class {
    constructor(public name?: string) {
      console.log(name);
    }
  }
);
const e = new Test4('yyy');
console.log(e.getName());

// 对方法进行装饰
// 普通方法 target 对应的是类的 prototype
// 静态方法 target 对应的是类的构造函数
function testDecorator5(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {}

class Test5 {
  constructor(public name: string) {}

  @testDecorator5
  getName() {
    return this.name;
  }

  @testDecorator5
  static getAge() {}
}
