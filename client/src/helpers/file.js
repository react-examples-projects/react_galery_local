export function toUrlFile(blob, cb) {
  const fr = new FileReader();
  fr.onload = () => {
    const url = fr.result;
    cb(url);
  };

  fr.readAsDataURL(blob);
}
