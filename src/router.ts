import { Router, Request } from 'express';
import Analyzer from './analyzer';
import Crawler from './crawler';
import fs from 'fs';
import path from 'path';

const router = Router();

interface RequestForLogin extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

router.get('/', (req, res) => {
  const isLogin = req.session && req.session.login ? true : false;
  if (isLogin) {
    res.send(`
    <html>
      <body>
        <a href='/data'>获取内容</a>
        <a href='/logout'>退出</a>
      </body>
    </html>
  `);
  } else {
    res.send(`
      <html>
        <body>
          <form method='post' action='/login'>
            <input name='username' placeholder='用户名' />
            <input type='password' name='password' placeholder='密码' />
            <button>登录</button>
          </form>
        </body>
      </html>
    `);
  }
});

router.post('/login', (req: RequestForLogin, res) => {
  const { username, password } = req.body;
  const isLogin = req.session && req.session.login ? true : false;
  if (isLogin) {
    res.send('已经登录过.');
  } else {
    if (username !== 'liam' && password !== '123') {
      res.send('用户名或密码错误!');
    } else {
      if (req.session) {
        req.session.login = true;
        res.send(`登录成功!`);
      }
    }
  }
});

router.get('/logout', (req: RequestForLogin, res) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect('/');
});

router.get('/data', (req: RequestForLogin, res) => {
  const isLogin = req.session && req.session.login ? true : false;
  if (!isLogin) {
    res.send('登录后获取!');
  } else {
    const url = 'https://movie.douban.com/top250';
    const analyzer = Analyzer.getInstance();
    new Crawler(url, analyzer);
    res.send(`get data success.`);
  }
});

router.get('/showData', (req: RequestForLogin, res) => {
  const isLogin = req.session && req.session.login ? true : false;
  if (!isLogin) {
    res.send('请登录后获取!');
  } else {
    try {
      const filePath = path.resolve(__dirname, '../data/movie.json');
      const content = fs.readFileSync(filePath, 'utf-8');
      res.json(JSON.parse(content));
    } catch (e) {
      console.log(e);
      res.send('内容为空,请重新获取');
    }
  }
});

export default router;
