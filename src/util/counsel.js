// 주민번호 '-' 제거 함수
export const personalNumberFormatter = (personalNum) => {
  return personalNum.replace(/-/g, "");
};

// Date 객체 포맷 함수
export const formatDate = (date) => {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");
  let milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};
