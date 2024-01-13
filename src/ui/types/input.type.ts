export type InputType =
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'number'
  | 'password'
  | 'text'
  | 'time'
export type InputValue<T> = (T extends 'number' ? number : string) | null
