class PersonC {
  name = 'liam';
  getName() {
    return this.name;
  }
}

class Teacher extends PersonC {
  getTeacherName() {
    return 'shao';
  }
  // rewrite
  getName() {
    // 重写后使用super重新调用父类方法
    return super.getName() + 'yulu';
  }
}

const teacher = new Teacher();
console.log(teacher.getName());
console.log(teacher.getTeacherName());

// 构造函数
class Shao {
  // 传统写法
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  // 简写
  // constructor(public name: string) {

  // }
}
// 子类继承父类时修改构造函数必须使用super调用父类的构造函数
class Yu extends Shao {
  constructor(public age: number) {
    super('name');
  }
}
const a = new Yu(18);
console.log(a.name, a.age);

// getter 和 setter 的使用
class PersonD {
  // 实例化后只能读不能修改；
  // readonly sex: string;
  constructor(private _name: string) {}
  get name() {
    // 可以获取到私有成员
    return this._name;
  }
  set name(name: string) {
    // logic code
    this._name = name;
  }
}
const d = new PersonD('sh');
// set
d.name = 'ddd';
// get
console.log('>>>>', d.name);

// 单例模式
class Demo {
  private static instance: Demo;
  private constructor(public name: string) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Demo('single');
    }
    return this.instance;
  }
}
const s1 = Demo.getInstance();
const s2 = Demo.getInstance();
console.log('single>>>', s1.name, s2.name);

// 抽象类
// 只能被继承
abstract class Shape {
  abstract getArea(): number;
  getType() {
    return 'shape';
  }
}
class triangle extends Shape {
  getArea() {
    return 123;
  }
}
