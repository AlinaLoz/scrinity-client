import TimeAgo from 'javascript-time-ago';

import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addLocale(ru);
export const timeAgo = new TimeAgo('ru-RU');
