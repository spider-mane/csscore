import NavActions from './NavActions';
import NavDomEventController from './NavDomEventController';
import NavSelectors from './NavSelectors';
import NavState from './NavState';
import NavMediaQueries from './NavMediaQueries';
import NavDomEventExecutive from './NavDomEventExecutive';
import ScrollControl from '../scroll/ScrollControl';

/**
 * @param {Object} config
 * @param {HTMLElement} config.nav
 * @param {HTMLElement} config.toggle
 * @param {Object} config.selectors
 * @param {String} config.selectors.nav
 * @param {String} config.selectors.menuItem
 * @param {String} config.selectors.submenu
 * @param {String} config.selectors.submenuBack
 * @param {String} config.selectors.icon
 * @param {Object} config.queries
 * @param {MediaQueryList} config.queries.mobile
 * @param {MediaQueryList} config.queries.desktop
 * @param {ScrollControl} config.scrollControl
 * @param {CallableFunction} config.toggleCb
 *
 * @returns {void}
 */
export default function initNavigation({
  nav,
  toggle,
  selectors,
  queries: {mobile, tablet, desktop},
  scrollControl,
  toggleCb,
}) {
  selectors = new NavSelectors(selectors);

  let state = new NavState();
  let actions = new NavActions(nav, selectors, state, scrollControl);
  let queries = new NavMediaQueries(mobile, tablet, desktop);
  let conditions = new NavDomEventExecutive(queries);

  new NavDomEventController(toggle, actions, conditions, toggleCb).init();
}
