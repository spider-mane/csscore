import ScrollActions from './ScrollActions';

export default class DocumentScrollActions extends ScrollActions {
  constructor() {
    super(document.documentElement);
  }
}
