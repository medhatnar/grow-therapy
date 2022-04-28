export const yesterday = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const month = today.getUTCMonth() + 1;
  const monthFormatted = month >= 10 ? month : `0${month}`;
  const day = today.getUTCDate() - 1;
  const dayFormatted = day >= 10 ? day : `0${day}`;
  const year = today.getUTCFullYear();

  return year + "/" + monthFormatted + "/" + dayFormatted;
};
