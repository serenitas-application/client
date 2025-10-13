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
