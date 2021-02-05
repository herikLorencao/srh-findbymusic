import { Notify } from 'quasar';

Notify.registerType('custom-warning', {
  icon: 'announcement',
  color: 'grey-4',
  textColor: 'grey-10',
});

function notify(type, message) {
  Notify.create({
    type,
    message,
  });
}

export default notify;
