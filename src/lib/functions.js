export function findElementByName(arr, name) {
  for (const item of arr) {
    if (item.name === name) {
      return item;
    }
    if (item.items) {
      const found = findElementByName(item.items, name);
      if (found) {
        return found;
      }
    }
  }
  return null;
}
