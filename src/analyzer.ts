import fs from 'fs';
import cheerio from 'cheerio';

interface Movie {
  name: string;
  score: number;
}

interface Content {
  [propName: number]: Movie[];
}

export default class Analyzer {
  // 单例模式
  private static analyzer: Analyzer;
  private constructor() {}
  static getInstance() {
    if (!this.analyzer) {
      this.analyzer = new Analyzer();
    }
    return this.analyzer;
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
    return resultArr;
  }

  private saveToJSON(movieData: Movie[], filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath, 'utf-8');
      fileContent = JSON.parse(file);
    }
    fileContent[new Date().getTime()] = movieData;
    return fileContent;
  }

  analysis(html: string, filePath: string) {
    const movieData = this.resolveHtml(html);
    const fileContent = this.saveToJSON(movieData, filePath);
    return JSON.stringify(fileContent);
  }
}
