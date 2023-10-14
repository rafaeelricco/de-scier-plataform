import sha256 from 'sha256'

export function uuid(str: string) {
   return sha256(str)
}
