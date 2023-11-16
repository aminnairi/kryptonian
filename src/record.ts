import { RecordRule } from "."

export const length = ({length, message}: { length: number, message: string }): RecordRule => {
  return {
    valid: value => Object.keys(value).length === length,
    message
  }
}
