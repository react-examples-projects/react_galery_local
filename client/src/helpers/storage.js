import NodeCache from "node-cache";

const storage = new NodeCache();

export function saveImagesInStorage(images) {
  storage.set("images", JSON.stringify(images));
}

export function getImagesFromStorage() {
  const json = storage.get("images");
  if (!json) return [];
  return JSON.parse(json);
}

export function existsImagesInStorage() {
  const images = getImagesFromStorage();
  return images.length > 0;
}

export function removeImagesFromStorage() {
  storage.del("images");
}
