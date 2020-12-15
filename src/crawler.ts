import agent from 'superagent';
import cheerio from 'cheerio';

interface Movie {
  name: string;
  score: number;
}

class Crawler {
  private url = 'https://movie.douban.com/top250';
  private rawHtml = '';
  constructor() {
    console.log(this.url);
    this.getHtml();
  }
  private async getHtml() {
    const res = await agent
      .get(this.url)
      .set(
        'user-agent',
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
      );
    this.resolveHtml(res.text);
  }
  private resolveHtml(html: string) {
    const $ = cheerio.load(html);
    //通过li标签找到电影列表
    const movieList = $('.grid_view').find('li');
    const resultArr: Movie[] = [];
    movieList.map((index, element) => {
      let info = $(element).find('.info');
      const scroe = info.find('.rating_num').text();
      const name = info.find('.title').text();
      //将所需数据解析并封装成一个json对象
      const result = {
        name: name.split('/')[0].trim(),
        score: Number(scroe),
      };
      //需要将json对象转换成json格式的字符串放入到数组中
      resultArr.push(result);
    });
    console.log(resultArr);
  }
}
const crawler = new Crawler();
