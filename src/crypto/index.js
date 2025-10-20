import { decrypt, encrypt } from './crypto';
import { convertToLatin, dataToBytes } from './transformData';

export const encryptToLatin = async (content, secretKey) => {
  const encryptedContent = await encrypt(content, secretKey);
  return convertToLatin(encryptedContent);
};

export const decryptFromLatin = async (content, secretKey) => {
  const dataInBytes = dataToBytes(content);
  return await decrypt(dataInBytes, secretKey).catch(() => {
    return null;
  });
};
