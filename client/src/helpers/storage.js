export function saveImagesInStorage(images) {
  sessionStorage.setItem("images", JSON.stringify(images));
}

export function getImagesFromStorage() {
  const json = sessionStorage.getItem("images");
  if (!json) return [];
  return JSON.parse(json);
}

export function existsImagesInStorage() {
  const images = getImagesFromStorage();
  return images.length > 0;
}
