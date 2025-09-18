export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidExpiry(expiry) {
  return Number.isInteger(expiry) && expiry > 0;
}

export function isValidShortcode(code) {
  return /^[a-zA-Z0-9_-]+$/.test(code);
}
