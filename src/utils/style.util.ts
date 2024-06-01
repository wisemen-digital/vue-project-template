import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export class StyleUtil {
  static cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
  }
}
