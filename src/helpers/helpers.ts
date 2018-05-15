/**
 * Returns a function that returns a promise which will pass the given value.
 * This can be used to chain between .then's like:
 * Promise.resolve().then(delayWithPass(5000)).then(...)
 */
export function delayWithPass(delayTime: number): (x: any) => Promise<any> {
  return (x: any) => {
    return new Promise(resolve => setTimeout(() => resolve(x), delayTime));
  };
}
