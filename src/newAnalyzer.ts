import { HtmlAnalyzer } from './crawler';

export default class bee implements HtmlAnalyzer {
  analysis(html: string, filePath: string) {
    return html;
  }
}
