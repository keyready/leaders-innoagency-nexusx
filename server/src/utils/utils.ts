import * as cpyto from 'crypto';
import { v4 as uniqueId } from 'uuid'

export function generateConfirmationCode() {
    return String(Math.floor(1000 + Math.random() * 9000))
}

export function generateTemporarilyPassword(){
    return cpyto.randomBytes(10).toString('hex')
}

export function generateUniqueId(){
    const id = uniqueId()
    return id
}