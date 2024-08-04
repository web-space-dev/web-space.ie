import { css } from "@emotion/react";
import { baseFontSize, breakpoints, colors, dimensions } from "./variables";

export const getEmSize = (size: number) => size / baseFontSize;
export const getRemSize = (px: number): string => `${px / baseFontSize}rem`;

export const theme = css`
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    width: 100%;
    font-size: ${baseFontSize}px;
    line-height: ${dimensions.lineHeight.regular};
    font-family: "Darker Grotesque", sans-serif;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    min-width: 0;
  }
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  body {
    -webkit-font-smoothing: subpixel-antialiased;
    text-rendering: optimizeLegibility;
    width: 100%;
    overflow-x: hidden;
    // overflow-y: scroll;
    height: 100%;

    color: ${colors.white};
    background-color: ${colors.black};
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    margin: 0;
    padding: 0;
  }
  label {
    color: ${colors.white};
  }
  a {
    color: ${colors.white};
    transition: 300ms color ease-out;

    text-decoration: none;
    &:hover,
    &:focus {
      color: ${colors.accent};
    }
  }
  img {
    position: relative;
  }
  figure {
    margin: 2rem 0;
  }
  figcaption {
    font-size: 80%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.414rem;
    margin-bottom: 0.5rem;
    color: ${colors.white};
    font-weight: 500;
    line-height: ${dimensions.lineHeight.heading};
    text-rendering: optimizeLegibility;
    letter-spacing: 1px;
  }

  h1 {
    margin-top: 0;

    font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
    font-weight: 500;
    @media (max-width: ${breakpoints.md}px) {
      font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};
    }
  }

  h1,
  h4,
  p {
    color: ${colors.white};
  }
  p {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
    @media (max-width: ${breakpoints.md}px) {
      font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
    }
  }
  strong {
    color: ${colors.white};
  }
  ul,
  ol,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  dt {
    font-weight: 600;
  }
  dd {
    margin-bottom: 0.5rem;
  }
  hr {
    position: relative;
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid ${colors.bgLight};
  }
  blockquote {
    margin: 0.8rem 0;
    padding: 0.5rem 1rem;
    border-left: 0.25rem solid ${colors.bgLight};
    color: ${colors.bgLight};
    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
    @media (min-width: ${getEmSize(breakpoints.md)}em) {
      padding-right: 5rem;
      padding-left: 1.25rem;
    }
  }
  input,
  textarea,
  button,
  input [type="submit"] {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
    font-family: "Darker Grotesque", sans-serif;
    background-color: ${colors.white};
    border: 1px solid ${colors.blackLight};
    color: ${colors.black};
    padding: 0.4rem 0.5rem;
    // margin-bottom: 1rem;
    width: 100%;

    &::placeholder,
    &::-webkit-input-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder,
    &:-moz-placeholder {
      font-family: "Darker Grotesque", sans-serif;
    }
  }
  input:focus,
  textarea:focus {
    font-family: "Darker Grotesque", sans-serif;
    outline: none;
    transition: border 0.5s, background 0.5s;
    background: ${colors.accentLight}32;
    border-color: ${colors.accent};
  }
  button {
    background: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 0;
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
    box-sizing: border-box;
    border-radius: 50px;
    height: 51px;
    background-color: ${colors.white};
    color: ${colors.accent};
    font-weight: 682;
    padding: 19px 24px 19px 40px;
    border: 0;
    font-family: inherit;
  }
  button:hover {
    text-decoration: none;
    cursor: pointer;
  }
  label {
    margin-bottom: 16px;
  }
`;
