const rvw = '--rvw';
const rvh = '--rvh';

const vvw = '--vvw';
const vvh = '--vvh';

const unit = 'px';
const root = document.documentElement;
const style = root.style;

function setRealViewportDimensions() {
  style.setProperty(rvw, root.clientWidth + unit);
  style.setProperty(rvh, root.clientHeight + unit);
}

function setVisualViewportDimensions() {
  style.setProperty(vvw, window.visualViewport.width + unit);
  style.setProperty(vvh, window.visualViewport.height + unit);
}

function setCssVars() {
  setRealViewportDimensions();
  setVisualViewportDimensions();
}

function updateOnResize() {
  window.addEventListener('resize', setCssVars);
}

export function track() {
  setCssVars();
  updateOnResize();
}
