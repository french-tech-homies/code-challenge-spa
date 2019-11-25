import Document, { NextDocumentContext, Enhancer } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const sheet: any = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const enhanceApp: Enhancer = App => props => sheet.collectStyles(<App {...props} />);

    try {
      ctx.renderPage = () => originalRenderPage(enhanceApp);
      const initialProps: any = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [...initialProps.styles, ...sheet.getStyleElement()]
      };
    } finally {
      sheet.seal();
    }
  }
}
