export function bufferToUint8Array(base64) {
  // console.log(base64);
  if (base64?.data) {
    return new Uint8Array(base64?.data);
  } else {
    return new Uint8Array(base64);
  }
}
