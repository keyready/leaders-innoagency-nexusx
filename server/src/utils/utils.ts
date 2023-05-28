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

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
}

export const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}