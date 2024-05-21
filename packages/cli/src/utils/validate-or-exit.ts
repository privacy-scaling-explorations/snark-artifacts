export function validateOrThrow<T>(parameter: T | undefined, validate: (param: T) => boolean, error: string): void {
  if (parameter !== undefined && !validate(parameter))
    throw new Error(error)
}
