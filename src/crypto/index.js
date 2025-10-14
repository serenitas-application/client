import { encrypt } from './crypto';
import { convertToLatin } from './transformData';

export const encryptToLatin = async (content, secretKey) => {
  const encryptedContent = await encrypt(content, secretKey);
  return convertToLatin(encryptedContent);
};
