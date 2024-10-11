export default class ScrollActions {
  /**
   * @type {HTMLElement}
   */
  #element;

  /**
   * @prop {string} overflow
   * @prop {string} gutter
   */
  #original;

  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.#element = element;

    this.#original = {
      overflow: element.style.overflow,
      gutter: element.style.scrollbarGutter,
    };
  }

  /**
   * @returns {HTMLElement}
   */
  get element() {
    return this.#element;
  }

  enable() {
    let style = this.element.style;

    style.scrollbarGutter = this.#original.gutter;
    style.overflow = this.#original.overflow;
  }

  disable() {
    this.#resolveNoScrollGutter();
    this.element.style.overflow = 'hidden';
  }

  #resolveNoScrollGutter() {
    if (!this.#original.gutter.includes('stable') && this.hasOverflow()) {
      this.element.style.scrollbarGutter = 'stable';
    }
  }

  hasOverflow() {
    return this.hasOverflowY() || this.hasOverflowX();
  }

  hasOverflowY() {
    return this.element.scrollHeight > this.element.clientHeight;
  }

  hasOverflowX() {
    return this.element.scrollWidth > this.element.clientWidth;
  }
}
