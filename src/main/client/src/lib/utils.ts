import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const strInclude = (arr: string[] | string, item: string) => {
  let arr2 = Array.from(arr)

  arr2 = arr2.map(val => val.trim().replaceAll(' ', '').toLowerCase())
  console.log(arr2, item.trim().replaceAll(' ', '').toLowerCase())

  return arr2.includes(item.trim().replaceAll(' ', '').toLowerCase())
}
