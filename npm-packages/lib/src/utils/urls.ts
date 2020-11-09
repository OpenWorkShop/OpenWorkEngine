export function addQueryParameter(
  url: string,
  key: string,
  value: string
): string {
  const parts = url.split('?');
  const qps = parts[1] || '';

  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  // kvp looks like ['key1=value1', 'key2=value2', ...]
  const kvp = qps.split('&');
  let i = 0;

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(key + '=')) {
      const pair = kvp[i].split('=');
      pair[1] = value;
      kvp[i] = pair.join('=');
      break;
    }
  }

  if (i >= kvp.length) {
    kvp[kvp.length] = [key, value].join('=');
  }

  return parts[0] + '?' + kvp.join('&');
}

type IPushLocalHistory = (localUrl: string) => void;

// Helper for navigation that uses local history navigation only when the URL is local.
// Useful in login callbacks & redirection, where we may have either local or remote URLs.
export function navigateToUrl(url: string, push?: IPushLocalHistory): void {
  try {
    if (url.startsWith(window.location.origin)) {
      // Convert absolute local URL into a relative
      url = url.substr(window.location.origin.length);
    }
    const isLocal = url.startsWith('/');
    if (isLocal && push) {
      push(url);
    } else {
      window.location.assign(url);
    }
  } catch (e) {
    console.log('Navigation failed; falling back on window.location for', url);
    window.location.assign(url);
  }
}
