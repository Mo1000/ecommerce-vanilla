

export function getLocalStorageValue(name: string): string | null {
  return localStorage.getItem(name) ;
}
export const setLocalStorageValue = (key: string, value: string) => {
  localStorage.setItem(key, value) ;
};
export const destroyLocalStorageValue = (key: string) => {
   localStorage.removeItem(key) ;
};
