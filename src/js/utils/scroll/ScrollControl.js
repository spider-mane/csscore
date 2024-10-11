import {pull} from 'lodash';
import ScrollActions from './ScrollActions';

export default class ScrollControl {
  /**
   * @type {Array}
   */
  #clients = [];

  /**
   * @type {ScrollActions}
   */
  #actions;

  /**
   * @param {ScrollActions} actions
   */
  constructor(actions) {
    this.#actions = actions;
  }

  hold(client) {
    this.#addClient(client).#doHoldActions();
  }

  release(client) {
    this.#removeClient(client).#doReleaseActions();
  }

  #addClient(client) {
    this.#clients.push(client);

    return this;
  }

  #removeClient(client) {
    pull(this.#clients, client);

    return this;
  }

  #doHoldActions() {
    if (this.#isFreshStart()) {
      this.#disableScrolling();
    }
  }

  #doReleaseActions() {
    if (this.#isClosingTime()) {
      this.#enableScrolling();
    }
  }

  #isFreshStart() {
    return 1 === this.#clients.length;
  }

  #isClosingTime() {
    return 0 === this.#clients.length;
  }

  #enableScrolling() {
    this.#actions.enable();
  }

  #disableScrolling() {
    this.#actions.disable();
  }
}
