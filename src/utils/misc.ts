import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export const date2utc = (date: Date) => date.toISOString().replace(/\.[0-9]+Z$/, 'Z')
export const date2utcms = (date: Date) => date.toISOString()
export const jst2utc = (jst: string) => date2utc(new Date(jst))
export const jst2utcms = (jst: string) => date2utcms(new Date(jst))
export const utc2jst = (utc?: string | number) => (utc !== undefined ? format(new Date(utc), 'yyyy/MM/dd HH:mm:ss', { locale: ja }) : '---')
export const utc2jst_jp = (utc?: string | number) => (utc !== undefined ? format(new Date(utc), 'yyyy年MM月dd日(E) HH:mm:ss', { locale: ja }) : '---')
