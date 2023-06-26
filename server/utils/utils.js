export const isValidDate = (date) => {
  return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
};

export const isFormattedStringDate = (date) => {
  // YYYY-MM-DD default in system.
  // console.log('tests', typeof date, date.length, date.slice(4, 5));
  return (
    typeof date === 'string' &&
    date.slice(4, 5) === '-' &&
    date.slice(7, 8) === '-' &&
    (date.length === 10 || date.length === 19 || date.length === 24)
  );
};

export const formatDate = (theDate, format, dayAdj = 0) => {
  // console.log('formatDate', theDate, new Date(theDate));
  let d = null;
  if (theDate) {
    if (isValidDate(theDate)) {
      // console.log('formatDate It is a date');
      d = theDate;
    } else if (isFormattedStringDate(theDate) && theDate.length === 24) {
      //YYYY-MM-DDThh:mm:ss.000Z  db value with time
      // console.log('formatDate It is a string date with time from db');
      d = new Date(theDate);
    } else if (isFormattedStringDate(theDate) && theDate.length === 19) {
      //YYYY-MM-DDThh:mm:ss  js value with time
      // console.log('formatDate It is a string date with time from js');
      d = new Date(theDate);
    } else if (isFormattedStringDate(theDate) && theDate.length === 10) {
      // YYYY-MM-DD  db value without time
      // console.log('formatDate It is a string date without time');
      d = new Date(theDate);
      d.setUTCMinutes(d.getTimezoneOffset()); // Since there is no time... fixes the time to be midnight our timezone.
    } else {
      // console.log('formatDate something else', theDate);
      // a value was passed but it was a non date value.
      return '';
    }
    if (format === '/') {
      d.setDate(d.getDate() + dayAdj);
      const theMonth = d.getMonth() + 1;
      const theDay = d.getDate();
      const theYear = d.getFullYear().toString().substr(-2);
      // console.log('date parts', theMonth, theDay, theYear);
      return `${theMonth}/${theDay}/${theYear}`;
    }

    d.setDate(d.getDate() + dayAdj);
    const theMonth = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
    const theDay = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
    // console.log('date parts', theMonth, theDay, d.getFullYear());
    return `${d.getFullYear()}-${theMonth}-${theDay}`;
  }
  // console.log('formatDate NULL', theDate);
  return ''; // null value.  Ignore.
};
