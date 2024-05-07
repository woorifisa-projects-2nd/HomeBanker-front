// 주민번호 '-' 제거 함수
export const personalNumberFormatter = (personalNum) => {
  return personalNum.replace(/-/g, "");
};

// 전화번호에 '-' 추가 함수
export const formatPhoneNumber = (phoneNumber) => {
  const digits = phoneNumber.replace(/\D/g, "");
  const formatted = digits.replace(/(\d{3})(\d{4})(\d{4})/, "010-$2-$3");
  return formatted;
};
