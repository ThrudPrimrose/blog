export function formatDateToMonthYear(date) {
  const options = { year: 'numeric', month: 'long' };
  return new Date(date).toLocaleDateString("en-GB", options);
}

export function compareByDate(key1, key2) {
  return function (a, b) {
    const date1 = new Date(a[key1][key2]);
    const date2 = new Date(b[key1][key2]);

    if (date1 > date2) {
      return -1;
    } else if (date1 < date2) {
      return 1;
    } else {
      return 0;
    }
  }
}

export function isUnixEpoch(dateSerialized) {
  const date = new Date(dateSerialized);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const unixEpoch = new Date('1970-01-01');
  const epochYear = unixEpoch.getFullYear();
  const epochMonth = unixEpoch.getMonth();
  const epochDay = unixEpoch.getDate();

  return year === epochYear && month === epochMonth && day === epochDay;
}