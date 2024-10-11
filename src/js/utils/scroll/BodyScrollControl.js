import BodyScrollActions from './BodyScrollActions';
import ScrollControl from './ScrollControl';

export default class BodyScrollControl extends ScrollControl {
  constructor() {
    super(new BodyScrollActions());
  }
}
