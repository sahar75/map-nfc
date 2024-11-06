import CryptoJS from "crypto-js";

export async function encryptTabletId(tabletId: string) {
  // Convert key and iv from string to word arrays (UTF-8 encoding)
  const keyWords = CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916");
  const ivWords = CryptoJS.enc.Utf8.parse("aabbccddeeff0011");

  // Encrypt using AES with CBC mode and PKCS7 padding
  const encrypted = CryptoJS.AES.encrypt(tabletId, keyWords, {
    iv: ivWords,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // Return the encrypted text as a base64 string
  return encrypted.toString();
}
