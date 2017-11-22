export const transform = time => ({
  year: time.getFullYear(),
  month: time.getMonth(),
  date: time.getDate(),
  hour: time.getHours(),
  minute: time.getMinutes(),
  second: time.getSeconds(),
});

export const isLeapYear = Year => ((Year % 4) === 0) && ((Year % 100) !== 0) || ((Year % 400) === 0);

const monthCountDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const getCountDays = date => {
  if (isLeapYear(date.year) && (date.month === 2)) {
    return 29;
  }
  return monthCountDays[date.month];
};

// 上午下午分别闭环
export const getNewMinute = (date, increment) => {
  let { hour: nextHour, minute: nextMinute } = date;
  nextMinute += increment;
  switch (nextMinute) {
    case 60:
      nextMinute = 0;
      nextHour += 1;
      if (nextHour === 24) {
        nextHour = 12;
      } else if (nextHour === 12) {
        nextHour = 0;
      }
      break;
    case -1:
      nextMinute = 59;
      nextHour -= 1;
      if (nextHour === -1) {
        nextHour = 11;
      } else if (nextHour === 11) {
        nextHour = 23;
      }
      break;
    default:
      break;
  }
  return {
    ...date,
    hour: nextHour,
    minute: nextMinute,
  };
};
export const getNewHour = (date, increment) => {
  let { hour: nextHour } = date;
  nextHour += increment;
  switch (nextHour) {
    case 12:
      if (increment > 0) {
        nextHour = 0;
      }
      break;
    case 11:
      if (increment < 0) {
        nextHour = 23;
      }
      break;
    case -1:
      nextHour = 11;
      break;
    case 24:
      nextHour = 12;
      break;
    default:
      break;
  }

  return {
    ...date,
    hour: nextHour,
  };
};
/* // 上下午闭环
export const getNewMinute = (date, increment) => {
  let { hour: nextHour, minute: nextMinute } = date;
  nextMinute += increment;
  switch (nextMinute) {
    case 60:
      nextMinute = 0;
      nextHour += 1;
      if (nextHour === 24) {
        nextHour = 0;
      }
      break;
    case -1:
      nextMinute = 59;
      nextHour -= 1;
      if (nextHour === -1) {
        nextHour = 23;
      }
      break;
    default:
      break;
  }
  return {
    ...date,
    hour: nextHour,
    minute: nextMinute,
  };
};
export const getNewHour = (date, increment) => {
  let { hour: nextHour } = date;
  nextHour += increment;
  switch (nextHour) {
    case -1:
      nextHour = 23;
      break;
    case 24:
      nextHour = 0;
      break;
    default:
      break;
  }

  return {
    ...date,
    hour: nextHour,
  };
}; */

export const getNewMonth = (date, increment) => {
  let { year: nextYear, month: nextMonth } = date;
  nextMonth += increment;
  switch (nextMonth) {
    case 12:
      nextMonth = 0;
      nextYear += 1;
      break;
    case -1:
      nextMonth = 11;
      nextYear -= 1;
      break;
    default:
      break;
  }

  return {
    ...date,
    year: nextYear,
    month: nextMonth,
  };
};

export const getNewYear = (date, increment) => {
  let { decade: nextDecade, year: nextYear } = date;
  const latestDecadeStart = nextDecade * 10;
  const latestDecadeEnd = latestDecadeStart + 9;
  nextYear += increment;
  if (nextYear < latestDecadeStart) {
    nextDecade -= 1;
  }
  if (nextYear > latestDecadeEnd) {
    nextDecade += 1;
  }
  return {
    ...date,
    decade: nextDecade,
    year: nextYear,
  };
};

export const isSameTime = (time1, time2) => (
  time1.year === time2.year &&
      time1.month === time2.month &&
        time1.date === time2.date &&
          time1.hour === time2.hour &&
            time1.minute === time2.minute &&
              time1.second === time2.second
);

export const isSameYear = (time1, time2) => time1.year === time2.year;

export const isSameMonth = (time1, time2) => (
  time1.year === time2.year &&
      time1.month === time2.month
);

export const isSameDate = (time1, time2) => (
  time1.year === time2.year &&
      time1.month === time2.month &&
        time1.date === time2.date
);

export const getLatestDecadesStart = year => year - parseInt(String(year).slice(-1), 10);

export const pad = (num, n) => {
  let len = num.toString().length;
  while (len < n) {
    num = `0${num}`;
    len += 1;
  }
  return num;
};
