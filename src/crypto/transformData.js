export const convertToLatin = (dataInBytes) => {
  const dataArray = Array.from(new Uint8Array(dataInBytes));
  let res = '';
  dataArray.forEach((data) => {
    const shapeCode = (Number(data) % 256) + 256;
    res += String.fromCharCode(shapeCode);
  });
  return res;
};
