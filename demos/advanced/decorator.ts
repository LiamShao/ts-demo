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
function methodDecorator5(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {}

// 属性装饰器没有描述器
function attrDecorator(target: any, key: string) {
  // 这里修改的是原型的age 而不是实例的属性
  target[key] = 22;
}

// 参数装饰器: 原型 方法名 参数位置
function paramDecorator(target: any, method: string, paramIndex: number) {
  console.log('>>>p', target, method, paramIndex);
}

class Test5 {
  @attrDecorator
  age = 18;

  constructor(private _name: string) {}

  @methodDecorator5
  getName() {
    return this._name;
  }

  @methodDecorator5
  static getAge() {}

  get name() {
    return this._name;
  }
  // getter和setter访问器的装饰器和普通方法一样，但是getter和setter同时只能有一个使用装饰
  @methodDecorator5
  set name(name: string) {
    this._name = name;
  }

  getGender(name: string, @paramDecorator age: number) {
    console.log('>>>', name, age);
  }
}
const f = new Test5('shaooo');
console.log(f.age);
// 访问原型的属性
console.log((f as any).__proto__.age);
console.log(f.getGender('lucas', 28));

// 使用装饰器+工厂模式实现 try catch的封装
function catchError(msg: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function () {
      try {
        fn();
      } catch (e) {
        console.log(msg);
      }
    };
  };
}
const userInfo: any = undefined;
class Test6 {
  @catchError('name不存在')
  getName() {
    return userInfo.name;
  }

  @catchError('age不存在')
  getAge() {
    return userInfo.age;
  }
}
const g = new Test6();
console.log(g.getName(), g.getAge());
