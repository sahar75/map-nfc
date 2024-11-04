import CryptoJS from "crypto-js";

export async function encryptTabletId(tabletId: string) {
  const key = CryptoJS.enc.Hex.parse("b14ca5898a4e4133bbce2ea2315a1916"); // Hex-encoded key
  const iv = CryptoJS.enc.Hex.parse("aabbccddeeff0011"); // Hex-encoded IV

  // Encrypt the tablet ID
  const encrypted = CryptoJS.AES.encrypt(tabletId, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Return the encrypted data as a Base64 string
  return encrypted.toString();
}
