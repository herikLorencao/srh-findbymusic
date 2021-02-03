import { Notify } from 'quasar';

function notify(type, message) {
  Notify.create({
    type,
    message,
  });
}

export default notify;
