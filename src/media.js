import { css } from "styled-components";

const deviceSizes = {
  mobile: 375,
  tablet: 768,
  laptop: 1024
}

export default Object.keys(deviceSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media screen and (max-width: ${deviceSizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc
}, {});