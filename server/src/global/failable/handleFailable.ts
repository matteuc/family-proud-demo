// CREDIT
// https://medium.com/@dhruvrajvanshi/making-exceptions-type-safe-in-typescript-c4d200ee78e9

function failable<T = never, E = never>(
    f: (
      (arg: {
        success(value: T): Failable<T, E>;
        failure(error: E): Failable<T, E>;
        run<R>(func: () => Failable<R, E>): R;
      }) => Failable<T, E>
    )
  ): Failable<T, E> {
    try {
      return f({
        success(value) {
          return {
            isError: false,
            value: value
          }
        },
        failure(e) {
          return {
            isError: true,
            error: e
          }
        },
        run(func) {
          const result = func()
          if (result.isError) {
            throw new Failure(result.error)
          } else {
            return result.value
          }
      }
      })
    } catch (e) {
      if (e instanceof Failure) {
        return {
          isError: true,
          error: e.value
        }
      } else {
        throw e
      }
    }
  }
  
  class Failure<E> {
    constructor(public readonly value: E) {}
  }

  export {
      failable, 
      Failure
  }