export default class NavMediaQueries {
  /**
   * @type {MediaQueryList|null}
   */
  #mobile;

  /**
   * @type {MediaQueryList|null}
   */
  #tablet;

  /**
   * @type {MediaQueryList|null}
   */
  #desktop;

  /**
   * @param {MediaQueryList} mobile
   * @param {MediaQueryList|null} tablet
   * @param {MediaQueryList|null} desktop
   */
  constructor(mobile, tablet, desktop) {
    this.#mobile = mobile;
    this.#tablet = tablet;
    this.#desktop = desktop;
  }

  /**
   * @returns {MediaQueryList}
   */
  get mobile() {
    return this.#mobile;
  }

  /**
   * @returns {MediaQueryList}
   */
  get tablet() {
    return this.#tablet ?? this.#mobile;
  }

  /**
   * @returns {MediaQueryList}
   */
  get desktop() {
    return this.#desktop ?? this.#tablet;
  }
}
