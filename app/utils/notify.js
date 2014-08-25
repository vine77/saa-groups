import Health from '../utils/mappings/health';
import healthToString from '../utils/convert/health-to-string';

export default function(message, type, notifyTitle, sticky) {
  if (message.length > 600) message = message.substring(0, 600) + '... [truncated]';
  if (typeof type === 'undefined') type = Health.WARNING;
  type = healthToString(type);
  if (typeof message === 'undefined') {
    var prefix = (type === 'info' || type === 'error') ? 'An ' : 'A ';
    message = prefix + type + ' event occurred';
  }
  if (typeof notifyTitle === 'undefined' || !notifyTitle) {
    notifyTitle = type.capitalize();
  }
  new window.PNotify({
    title: notifyTitle,
    text: message,
    type: type,
    animate_speed: 200,
    buttons: {
      sticker: false
    },
    hide: (sticky) ? false : true
  });
}
