import NavDomEventExecutive from './NavDomEventExecutive';
import NavActions from './NavActions';

export default class NavDomEventController {
  /**
   * @type {HTMLElement}
   */
  #toggle;

  /**
   * @type {NavActions}
   */
  #actions;

  /**
   * @type {NavDomEventExecutive}
   */
  #executive;

  /**
   * @type {CallableFunction}
   */
  #toggleCb;

  /**
   * @param {HTMLElement} toggle
   * @param {NavActions} actions
   * @param {NavDomEventExecutive} executive
   */
  constructor(toggle, actions, executive, toggleCb = null) {
    this.#actions = actions;
    this.#toggle = toggle;
    this.#executive = executive;
    this.#toggleCb = toggleCb;
  }

  /**
   * @returns {HTMLElement}
   */
  get toggle() {
    return this.#toggle;
  }

  /**
   * @returns {NavActions}
   */
  get actions() {
    return this.#actions;
  }

  /**
   * @returns {NavDomEventExecutive}
   */
  get executive() {
    return this.#executive;
  }

  init() {
    let nav = this.actions.nav;
    let selectors = this.actions.selectors;

    nav.addEventListener('click', this.manageTargetMenu);
    this.toggle.addEventListener('click', this.toggleNav);
    document.addEventListener('click', this.maybeDeactivateActiveMenu);

    Array.from(nav.querySelectorAll(selectors.menuItem)).forEach(item => {
      item.addEventListener('pointerenter', this.activateHoverTargetSubmenu);
      item.addEventListener('pointerleave', this.deactivateHoverTargetSubmenu);
    });
  }

  /**
   * @param {PointerEvent} e
   *
   * @returns {void}
   */
  toggleNav = e => {
    if (this.executive.approvesToggleNav(e)) {
      if (this.#toggleCb) {
        this.#toggleCb(this.toggle);
      }

      this.actions.toggleNav(e.target);
    }
  };

  /**
   * @param {PointerEvent} e
   *
   * @returns {void}
   */
  manageTargetMenu = e => {
    if (this.executive.approvesManageTargetMenu(e)) {
      this.actions.manageMenu(e.target);
    }
  };

  /**
   * @param {PointerEvent} e
   *
   * @returns {void}
   */
  maybeDeactivateActiveMenu = e => {
    if (this.executive.approvesMaybeDeactivateActiveMenu(e)) {
      this.actions.maybeDeactivateSubmenu(e.target);
    }
  };

  /**
   * @param {PointerEvent} e
   *
   * @returns {void}
   */
  activateHoverTargetSubmenu = e => {
    if (
      this.isMousePointerEvent(e) &&
      this.executive.approvesActivateHoverTargetSubmenu(e)
    ) {
      this.actions.activateNestedSubmenu(e.target);
    }
  };

  /**
   * @param {PointerEvent} e
   *
   * @returns {void}
   */
  deactivateHoverTargetSubmenu = e => {
    if (
      this.isMousePointerEvent(e) &&
      this.executive.approvesDeactivateHoverTargetSubmenu(e)
    ) {
      this.actions.deactivateNestedSubmenu(e.target);
    }
  };

  /**
   * @param {PointerEvent} e
   *
   * @returns {boolean}
   */
  isMousePointerEvent(e) {
    return 'mouse' == e.pointerType;
  }
}
