export type ErrorClass = () => Error;

export const genericErrorDetectionStrategy =
    ({
         errors = [],
     }: { readonly errors?: ReadonlyArray<ErrorClass> } = {}) => {
        return (error: Error) => {
            return errors.some((errorClass) => error.name === errorClass.name);
        }
    };
