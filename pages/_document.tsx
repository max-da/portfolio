import Document, { DocumentContext,Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
    
  }
  
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto"
            rel="stylesheet"
          />
        </Head>
        <body className='bg-bgWhite'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}


export default MyDocument