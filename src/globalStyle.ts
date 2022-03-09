import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *, *::before, *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  body {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  img {
    max-width: 100%;
  }
`