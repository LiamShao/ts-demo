import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import router from './router';

const app = express();
// app.use((req: Request, res: Response, next: NextFunction) => {
//   req.teacher = 'liam';
//   next();
// });

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(
  cookieSession({
    name: 'session',
    keys: ['demo'],
    maxAge: 1000 * 60 * 60, // 1 hour
  })
);

app.use(router);

app.listen(3000, () => {
  console.log('server is running');
});
