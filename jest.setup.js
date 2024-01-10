import "@testing-library/jest-dom";
import "whatwg-fetch";

window.scrollTo = (x, y) => {
  document.documentElement.scrollTop = y;
};
