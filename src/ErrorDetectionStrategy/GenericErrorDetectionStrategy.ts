export type ErrorClass = () => Error;

export const genericErrorDetectionStrategy = (
  { errors }: { readonly errors: ReadonlyArray<ErrorClass> } = { errors: [] }
) => {
  return (error: Error) =>
    errors.some(errorClass => error.name === errorClass.name);
};
