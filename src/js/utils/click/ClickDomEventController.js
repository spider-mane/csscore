export default class ClickDomEventController {
  /**
   * @param {ClickManager} manager
   */
  constructor(manager) {
    this.manager = manager;
  }

  init() {
    window.addEventListener('mousedown', this.addAttrToTarget);
    window.addEventListener('mouseup', this.removeAttrFromTarget);
  }

  /**
   * @param {PointerEvent} e
   */
  addAttrToTarget = e => {
    this.manager.togglePressState(e.target, true);
  };

  /**
   * @param {PointerEvent} e
   */
  removeAttrFromTarget = e => {
    this.manager.toggleClickState(e.target, false);
  };
}
