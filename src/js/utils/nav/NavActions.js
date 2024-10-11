import NavState from './NavState';
import NavSelectors from './NavSelectors';
import ScrollControl from '../scroll/ScrollControl';

export default class NavActions {
  /**
   * @type {HTMLElement}
   */
  #nav;

  /**
   * @type {NavSelectors}
   */
  #selectors;

  /**
   * @type {NavState}
   */
  #state;

  /**
   * @type {ScrollControl}
   */
  #scrollControl;

  /**
   * @typedef {object}
   * @property {string} navActivated
   * @property {string} navDeactivated
   */
  #events;

  /**
   * @param {HTMLElement} nav
   * @param {HTMLElement} toggle
   * @param {NavSelectors} selectors
   * @param {string} selectors.nav
   * @param {string} selectors.menuItem
   * @param {string} selectors.submenu
   * @param {string} selectors.submenuBack
   * @param {string} selectors.icon
   * @param {NavState} state
   */
  constructor(
    nav,
    selectors,
    state,
    scrollControl,
    events = {
      navActivated: 'app:navActivated',
      navDeactivated: 'app:navDeactivated',
      subnavActivated: 'app:subnavActivated',
      subnavDeactivated: 'app:subnavDeactivated',
    }
  ) {
    this.#nav = nav;
    this.#selectors = selectors;
    this.#state = state;
    this.#scrollControl = scrollControl;
    this.#events = events;
  }

  /**
   * @returns {HTMLElement}
   */
  get nav() {
    return this.#nav;
  }

  /**
   * @returns {NavSelectors}
   */
  get selectors() {
    return this.#selectors;
  }

  /**
   * @returns {NavState}
   */
  get state() {
    return this.#state;
  }

  /**
   * @param {HTMLElement} toggle
   */
  toggleNav(toggle) {
    const state = this.state;

    state.isActive = !state.isActive;

    if (state.isActive) {
      this.#scrollControl.hold(this);
      this.#broadcastNavActivated();
    } else {
      this.#scrollControl.release(this);

      if (state.activeSubmenu) {
        this.deactivateSubmenu(state.activeSubmenu);
      }

      this.#broadcastNavDeactivated();
    }

    this.nav.dataset.navActive = state.isActive;
  }

  /**
   * @param {HTMLElement} context
   */
  manageMenu(context) {
    let menu = context.closest(this.selectors.menuItem);

    if (menu) {
      this.manageSubmenu(menu, context);
    }
  }

  /**
   * @param {HTMLElement} menu
   * @param {HTMLElement} context
   */
  manageSubmenu(menu, context) {
    let submenu = context.closest(this.selectors.submenu);

    if (submenu) {
      this.manageSubmenuFromWithin(submenu, context);
    } else {
      this.manageSubmenuFromParent(menu);
    }
  }

  /**
   * @param {HTMLElement} submenu
   * @param {HTMLElement} context
   */
  manageSubmenuFromWithin(submenu, context) {
    let back = context.closest(this.selectors.submenuBack);

    if (back) {
      this.deactivateSubmenu(submenu);
    }
  }

  /**
   * @param {HTMLElement} menu
   */
  manageSubmenuFromParent(menu) {
    let previous = this.state.activeSubmenu;
    let current = this.getNestedMenu(menu);

    if (previous && previous !== current) {
      this.deactivateSubmenu(previous);
    }

    this.autoToggleSubmenu(current);
  }

  deactivatePossibleSubmenu() {
    let submenu = this.state.activeSubmenu;

    if (submenu) {
      this.deactivateSubmenu(submenu);
    }
  }

  deactivatePossibleNestedSubmenu(context) {
    let menu = context.closest(this.selectors.menuItem);

    if (!menu) {
      this.deactivatePossibleSubmenu();
    }
  }

  /**
   * @param {HTMLElement} context
   */
  maybeDeactivateSubmenu(context) {
    if (!this.nav.contains(context)) {
      this.deactivatePossibleSubmenu();
    } else {
      this.deactivatePossibleNestedSubmenu(context);
    }
  }

  /**
   * @param {HTMLElement} submenu
   * @param {bool} activated
   */
  toggleSubmenu(submenu, activated) {
    this.state.activeSubmenu = activated ? submenu : null;
    submenu.dataset.navActive = activated;
  }

  #broadcastNavActivated() {
    document.dispatchEvent(new Event(this.#events.navActivated));
  }

  #broadcastNavDeactivated() {
    document.dispatchEvent(new Event(this.#events.navDeactivated));
  }

  /**
   * @param {HTMLElement} submenu
   */
  autoToggleSubmenu(submenu) {
    this.toggleSubmenu(submenu, !this.state.activeSubmenu);
  }

  /**
   * @param {HTMLElement} menu
   */
  activateNestedSubmenu(menu) {
    this.activateSubmenu(this.getNestedMenu(menu));
  }

  /**
   * @param {HTMLElement} menu
   */
  deactivateNestedSubmenu(menu) {
    this.deactivateSubmenu(this.getNestedMenu(menu));
  }

  /**
   * @param {HTMLElement} submenu
   */
  activateSubmenu(submenu) {
    this.toggleSubmenu(submenu, true);
  }

  /**
   * @param {HTMLElement} submenu
   */
  deactivateSubmenu(submenu) {
    this.toggleSubmenu(submenu, false);
  }

  /**
   * @param {HTMLElement} menu
   *
   * @return {HTMLElement}
   */
  getNestedMenu(menu) {
    return menu.querySelector(this.selectors.submenu);
  }
}
