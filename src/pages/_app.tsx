import { AppProps } from "next/app";
import CustomCursor from "../components/global/customCursor";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomCursor />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
