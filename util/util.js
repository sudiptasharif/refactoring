function getDateTime() {
  return new Date().toLocaleDateString("en-us", {
    hour12: true,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

function setDateTime(dateTimeEleId) {
  let dateTime = getDateTime();
  setEleValue(dateTimeEleId, dateTime);
}

function setEleValue(eleId, eleValue) {
  let ele = document.getElementById(eleId);
  if (ele) {
    ele.innerHTML = eleValue;
  } else {
    console.log("Invalid Element Id: " + eleId);
  }
}
