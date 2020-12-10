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
