import DocumentScrollActions from './DocumentScrollActions';
import ScrollControl from './ScrollControl';

export default class DocumentScrollControl extends ScrollControl {
  constructor() {
    super(new DocumentScrollActions());
  }
}
