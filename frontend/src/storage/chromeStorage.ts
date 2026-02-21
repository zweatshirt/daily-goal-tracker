function isExtensionContext(): boolean {
  return typeof chrome !== "undefined" && !!chrome.storage;
}

export async function getStorageData<T>(key: string): Promise<T | undefined> {
  if (isExtensionContext()) {
    const result = await chrome.storage.local.get(key);
    return result[key] as T | undefined;
  }
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : undefined;
}

export async function setStorageData<T>(
  key: string,
  value: T,
): Promise<void> {
  if (isExtensionContext()) {
    await chrome.storage.local.set({ [key]: value });
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
}
