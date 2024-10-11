import ClickDomEventController from './ClickDomEventController';
import ClickManager from './ClickManager';
import ClickState from './ClickState';

export default function initClick() {
  let controller = new ClickDomEventController(
    new ClickManager(new ClickState())
  );

  controller.init();
}
