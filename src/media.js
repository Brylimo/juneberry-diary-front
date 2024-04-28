import { css } from "styled-components";

const deviceSizes = {
  xxs: 320,
  xs: 375,
  sm: 768,
  md: 992,
  lg: 1200
}

export default Object.keys(deviceSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media screen and (max-width: ${deviceSizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc
}, {});