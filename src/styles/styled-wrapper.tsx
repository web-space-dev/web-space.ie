import { Global, css } from "@emotion/react";
import { theme } from "./globalCss";
import { darkerGrotesque } from "./variables";

export function StyledWrapper({ children }) {
  return (
    <div className={darkerGrotesque.className} style={{ position: "relative" }}>
      <Global styles={() => css(theme)} />
      {children}
    </div>
  );
}
