import ScrollControl from '../scroll/ScrollControl';

export default class ModalActions {
  /**
   * @type {HTMLDialogElement}
   */
  #dialog;

  /**
   * @type {ScrollControl}
   */
  #scrollControl;

  constructor(dialog, scrollControl) {
    this.#dialog = dialog;
    this.#scrollControl = scrollControl;
  }

  open() {
    this.#dialog.showModal();
    this.#scrollControl.hold(this);
  }

  close() {
    this.#dialog.close();
    this.#scrollControl.release(this);
  }
}
