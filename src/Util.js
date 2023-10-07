export function formatDateToMonthYear(date) {
  const options = { year: 'numeric', month: 'long' };
  return new Date(date).toLocaleDateString("en-GB", options);
}

export function compareByDate(key1, key2) {
  return function(a){
    return function(b){
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
}