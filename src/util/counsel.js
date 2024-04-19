// 주민번호 '-' 제거 함수
export const personalNumberFormatter = (personalNum) => {
  return personalNum.replace(/-/g, '');
}