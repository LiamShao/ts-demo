import fs from 'fs';
import path from 'path';
import agent from 'superagent';
import Analyzer from './analyzer';
// 测试组合模式
// import Bee from './newAnalyzer';

export interface HtmlAnalyzer {
  analysis: (html: string, filePath: string) => string;
}

class Crawler {
  private filePath = path.resolve(__dirname, '../data/movie.json');
  constructor(private url: string, private analyzer: HtmlAnalyzer) {
    this.initProcess();
  }

  private async initProcess() {
    const html = await this.getHtml();
    const fileContent = this.analyzer.analysis(html, this.filePath);
    fs.writeFileSync(this.filePath, fileContent);
  }

  private async getHtml() {
    const res = await agent
      .get(this.url)
      .set(
        'user-agent',
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
      );
    return res.text;
  }
}

const url = 'https://movie.douban.com/top250';
const analyzer = Analyzer.getInstance();
// const analyzer = new Bee();
new Crawler(url, analyzer);
