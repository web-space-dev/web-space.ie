import { Html, Head, Main, NextScript } from "next/document";
import { darkerGrotesque } from "../styles/variables";

export default function Document() {
  return (
    <Html lang="en" className={darkerGrotesque.className}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
