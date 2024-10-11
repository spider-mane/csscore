import ModalActions from './ModalActions';

export default class ModalController {
  /**
   * @type {ModalActions}
   */
  #actions;

  /**
   * @type {HTMLElement[]}
   */
  #openers = [];

  /**
   * @type {HTMLElement[]}
   */
  #closers = [];

  /**
   * @param {ModalActions} actions
   * @param {HTMLElement[]} openers
   * @param {HTMLElement[]} closers
   */
  constructor(actions) {
    this.#actions = actions;
  }

  /**
   * @param {HTMLElement} opener
   *
   * @returns {this}
   */
  addOpener = opener => {
    this.#openers.push(opener);
    opener.addEventListener('click', this.#openModal);

    return this;
  };

  /**
   * @param {HTMLElement} closer
   *
   * @returns {this}
   */
  addCloser = closer => {
    this.#closers.push(closer);
    closer.addEventListener('click', this.#closeModal);

    return this;
  };

  /**
   * @param {Event} e
   */
  #openModal = e => {
    e.preventDefault();
    this.#actions.open();
  };

  /**
   * @param {Event} e
   */
  #closeModal = e => {
    e.preventDefault();
    this.#actions.close();
  };
}
