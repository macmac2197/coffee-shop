// generate unique id with prefix
export const generateUniqueIdWithPrefix = (prefix, characterLimit) => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2);

  let uniqueID = prefix + timestamp + randomString;

  if (characterLimit && uniqueID.length > characterLimit) {
    const availableSpace = characterLimit - prefix.length - timestamp.length;
    uniqueID = prefix + timestamp + randomString.substring(0, availableSpace);
  }

  return uniqueID.toUpperCase();
};
