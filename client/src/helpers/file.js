export function toUrlFile(blob) {
  const fr = new FileReader();
  return new Promise((success, fail) => {
    fr.onload = () => success(fr.result);
    fr.onerror = (err) => fail(new Error(err));
    fr.readAsDataURL(blob);
  });
}

export async function toArrayUrlFiles(files) {
  const arr = [];
  for (const file of files) {
    arr.push(toUrlFile(file));
  }
  const parsed = await Promise.all(arr);
  return parsed;
}
