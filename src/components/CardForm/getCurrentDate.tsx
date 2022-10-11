export function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let hour = newDate.getHours();
  let minutes = newDate.getMinutes();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${hour}:${minutes} ${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}
