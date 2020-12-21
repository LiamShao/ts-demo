// TS的类型融合机制和安装的@types文件融合
declare namespace Express {
  interface Request {
    teacher: string;
  }
}
