import NodeCache from "node-cache";

const storage = new NodeCache();

function getData(key, defaultValue = false) {
  const json = storage.get(key);
  if (!json) return defaultValue;
  return JSON.parse(json);
}

export function saveImagesInStorage(images) {
  storage.set("images", JSON.stringify(images));
}

export function getImagesFromStorage() {
  return getData("images", []);
}

export function existsImagesInStorage() {
  const images = getImagesFromStorage();
  return images.length > 0;
}

export function removeImagesFromStorage() {
  storage.del("images");
}

export function savePostItem(postId, postData) {
  storage.set(postId, JSON.stringify(postData));
}

export function getPostItemFromStorage(id) {
  return getData(id);
}

export function savePostItemComment(postId, comments) {
  storage.set(`comments-${postId}`, JSON.stringify(comments));
}

export function getCommentsPostItemFromStorage(postId) {
  return getData(`comments-${postId}`);
}
