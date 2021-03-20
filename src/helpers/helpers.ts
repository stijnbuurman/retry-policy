/**
 * Returns a function that returns a promise which will pass the given value.
 * This can be used to chain between .then's like:
 * Promise.resolve().then(delayWithPass(5000)).then(...)
 */
export function delayWithPass<T>(delayTime: number): (x: T) => Promise<T> {
  return (x: T) => {
    return new Promise((resolve) => setTimeout(() => resolve(x), delayTime));
  };
}
