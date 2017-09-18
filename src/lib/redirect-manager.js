export function getRedirectPathname() {
  return localStorage.getItem('redirectPathname');
}

export function getRedirectSearch() {
  return localStorage.getItem('redirectSearch');
}

export function storeLocation(pathname, search) {
  localStorage.setItem('redirectPathname', pathname);

  if (search) localStorage.setItem('redirectSearch', search);
}

export function removeLocation() {
  if (getRedirectPathname()) localStorage.removeItem('redirectPathname');

  if (getRedirectSearch()) localStorage.removeItem('redirectSearch');
}

export function isRedirectStored() {
  return !!localStorage.getItem('redirectPathname');
}

export function redirectErrorHandler(error) {
  console.error(`Something went wrong with the redirect: ${error}`);
}
