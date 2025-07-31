type RequestDecorator = <TArgs extends unknown[], TResult>(
 requestFunction: AsyncFunction<TArgs, TResult>
) => (...args: TArgs) => Promise<{ data?: TResult; error?: unknown }>;

type AsyncFunction<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

const requestDecorator: RequestDecorator = <TArgs extends unknown[], TResult>(
  requestFunction: AsyncFunction<TArgs, TResult>
) => {
  return async (
    ...args: TArgs
  ): Promise<{ data?: TResult; error?: unknown }> => {
    try {
      const data = await requestFunction(...args);
      return { data };
    } catch (error) {
      return { error };
    }
  };
};

export default requestDecorator;

// const requestDecorator = requestFunction => {
//     return async (...payload) => {
//         try {
//             const data = await requestFunction(...payload)
//             return { data };
//         }
//         catch (error) {
//             return { error };
//         }
//     }
// };
// export default requestDecorator;
