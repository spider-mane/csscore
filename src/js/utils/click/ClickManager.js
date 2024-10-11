import ClickState from './ClickState';

export default class ClickManager {
  /**
   * @param {ClickState} state
   */
  constructor(state) {
    this.state = state;
  }

  /**
   * @param {HTMLElement} element
   * @param {bool} pressed
   */
  togglePressState(element, pressed) {
    if (this.state.previousPressed) {
      this.state.previousPressed.dataset.clickPressed = false;
    }

    this.state.previousPressed = element;
    element.dataset.clickPressed = pressed;
  }
}
