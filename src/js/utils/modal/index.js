import ScrollControl from '../scroll/ScrollControl';
import ModalActions from './ModalActions';
import ModalController from './ModalController';

/**
 * @param {Object} modal
 * @param {string} modal.dialogId
 * @param {string[]} modal.openers
 * @param {string[]} modal.closers
 * @param {ScrollControl} scrollControl
 */
export default function initModal({dialogId, openers, closers}, scrollControl) {
  let dialog = document.getElementById(dialogId);

  if (!dialog) {
    return;
  }

  let controller = new ModalController(new ModalActions(dialog, scrollControl));

  openers.forEach(opener => {
    let elements = document.querySelectorAll(opener);

    if (elements.length > 0) {
      Array.from(elements, element => controller.addOpener(element));
    }
  });

  closers.forEach(closer => controller.addCloser(dialog.querySelector(closer)));
}
