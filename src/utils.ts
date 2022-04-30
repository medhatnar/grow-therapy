export const yesterday = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const month = today.getMonth() + 1;
  const monthFormatted = month >= 10 ? String(month) : `0${month}`;
  const day = today.getDate();
  const dayFormatted = day >= 10 ? String(day) : `0${day}`;
  const year = String(today.getFullYear());

  return { year, month: monthFormatted, day:dayFormatted };
};
