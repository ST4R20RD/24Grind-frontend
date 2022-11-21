function padTo2Digits(num: number) {
  return String(num).padStart(2, "0");
}

export function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let hour = padTo2Digits(newDate.getHours());
  let minutes = padTo2Digits(newDate.getMinutes());
  let date = padTo2Digits(newDate.getDate());
  let month = padTo2Digits(newDate.getMonth() + 1);
  let year = padTo2Digits(newDate.getFullYear());

  return `${hour}:${minutes} ${year}${separator}${month}${separator}${date}`;
}
