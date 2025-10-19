export const convertToLatin = (dataInBytes) => {
  const dataArray = Array.from(new Uint8Array(dataInBytes));
  let res = '';
  dataArray.forEach((data) => {
    const shapeCode = (Number(data) % 256) + 256;
    res += String.fromCharCode(shapeCode);
  });
  return res;
};

export const latinToBytes = (data) => {
  const res = [];
  data.forEach((ch) => {
    const charCode = (ch.charCodeAt(0) - 256) % 256;
    res.push(charCode);
  });

  return new Uint8Array(res);
};

export const dataToBytes = (data) => {
  const dataArray = Array.from(data);
  const code = dataArray[0].codePointAt(0);
  if (!code) return new Uint8Array([]);

  return latinToBytes(dataArray);
};
