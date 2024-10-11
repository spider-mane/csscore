export default class NavSelectors {
  /**
   * @type {string} nav
   */
  #nav;

  /**
   * @type {string}
   */
  #menuItem;

  /**
   * @type {string}
   */
  #submenu;

  /**
   * @type {string}
   */
  #submenuBack;

  /**
   * @type {string|null}
   */
  #icon;

  /**
   * @param {object} selectors
   * @param {string} selectors.nav
   * @param {string} selectors.menuItem
   * @param {string} selectors.submenu
   * @param {string} selectors.submenuBack
   * @param {string} selectors.icon
   */
  constructor(selectors) {
    this.#nav = selectors.nav;
    this.#menuItem = selectors.menuItem;
    this.#submenu = selectors.submenu;
    this.#submenuBack = selectors.submenuBack;
    this.#icon = selectors.icon ?? null;
  }

  /**
   * @returns {string}
   */
  get nav() {
    return this.#nav;
  }

  /**
   * @returns {string}
   */
  get menuItem() {
    return this.#menuItem;
  }

  /**
   * @returns {string}
   */
  get submenu() {
    return this.#submenu;
  }

  /**
   * @returns {string}
   */
  get submenuBack() {
    return this.#submenuBack;
  }

  /**
   * @returns {string|null}
   */
  get icon() {
    return this.#icon;
  }
}
