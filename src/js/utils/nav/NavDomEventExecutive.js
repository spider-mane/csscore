import NavMediaQueries from './NavMediaQueries';

export default class NavDomEventExecutive {
  /**
   * @type {NavMediaQueries} queries
   */
  #queries;

  /**
   * @param {NavMediaQueries} queries
   */
  constructor(queries) {
    this.#queries = queries;
  }

  /**
   * @returns {NavMediaQueries}
   */
  get queries() {
    return this.#queries;
  }

  /**
   * @param {PointerEvent} e
   *
   * @returns {boolean}
   */
  approvesToggleNav(e) {
    return true;
  }

  /**
   * @param {PointerEvent} e
   *
   * @returns {boolean}
   */
  approvesManageTargetMenu(e) {
    return true;
  }

  /**
   * @param {PointerEvent} e
   *
   * @returns {boolean}
   */
  approvesMaybeDeactivateActiveMenu(e) {
    return this.isDesktop();
  }

  /**
   * @param {PointerEvent} e
   *
   * @returns {boolean}
   */
  approvesActivateHoverTargetSubmenu(e) {
    return this.isDesktop();
  }

  /**
   * @param {PointerEvent} e
   *
   * @returns {boolean}
   */
  approvesDeactivateHoverTargetSubmenu(e) {
    return this.isDesktop();
  }

  /**
   * @returns {boolean}
   */
  isMobile() {
    return this.queries.mobile.matches;
  }

  /**
   * @returns {boolean}
   */
  isTablet() {
    return this.queries.tablet.matches;
  }

  /**
   * @returns {boolean}
   */
  isDesktop() {
    return this.queries.desktop.matches;
  }
}
