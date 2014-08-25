import Health from '../utils/mappings/health';
import notify from '../utils/notify';
import errorMessage from '../utils/xhr-error-message';

export default function(xhr, defaultMessage) {
  var message = errorMessage(xhr, defaultMessage);
  var severity = (xhr.status === 422 || (xhr[0] && xhr[0].status === 422)) ? Health.WARNING : Health.ERROR;
  notify(message, severity);
  return message;
}
