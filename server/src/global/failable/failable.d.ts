type Failable<R, E> = {
    isError: true;
    error: E;
  } | {
    isError: false;
    value: R;
  }