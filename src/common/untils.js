export function debounce(callback, delay) {
  let timer = null;
  return function(...arg) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, arg);
    }, delay);
  };
}