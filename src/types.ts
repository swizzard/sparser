export type S<O> = [O, string];
export type F<O> = (input: string) => S<O>;

export class ParseError extends Error {
  state: string;
  constructor(message: string, state: string) {
    super(message);
    this.state = state;
  }
}

export class NoMatchError extends ParseError {
  constructor(msg: string, state: string) {
    const message = `${msg} did not match`;
    super(message, state);
  }
}

export class UnexpectedEndOfInputError extends ParseError {
  constructor(state: string) {
    super("Unexpected end of input", state);
  }
}
