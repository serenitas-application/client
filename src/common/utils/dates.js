export const formatDateWithWeekday = (date) => {
  const weekdays = [
    'Неділя',
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    'П’ятниця',
    'Субота',
  ];

  const currentDate = new Date(date);
  const weekday = weekdays[currentDate.getDay()];
  const formattedDate = currentDate.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `${weekday}, ${formattedDate}`;
};

export const formatDateToYMD = (ts) => {
  const date = new Date(ts);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};
