import { describe, test, expect } from 'vitest'
import { jst2utc, jst2utcms, date2utc, date2utcms, utc2jst, utc2jst_jp } from '@/utils/misc'

describe('日時変換', () => {
  test('日本形式(JST)をISO8601拡張形式(UTC)に変換(秒)', () => {
    // YYYY/MM/DD
    expect(jst2utc('2023/01/01 00:00:00')).toBe('2022-12-31T15:00:00Z')
    // YYYY-MM-DD
    expect(jst2utc('2023-01-01 00:00:00')).toBe('2022-12-31T15:00:00Z')
    // TZ
    expect(jst2utc('2023-01-01T00:00:00+09:00')).toBe('2022-12-31T15:00:00Z')
    // 非推奨
    expect(jst2utc('2023-01-01T00:00:00')).toBe('2022-12-31T15:00:00Z')
    // NG
    expect(jst2utc('2023-01-01T00:00:00Z')).not.toBe('2022-12-31T15:00:00Z')
    expect(jst2utc('2023-01-01T00:00:00+10:00')).not.toBe('2022-12-31T15:00:00Z')
  })
  test('日本形式(JST)をISO8601拡張形式(UTC)に変換(ミリ秒)', () => {
    // YYYY/MM/DD
    expect(jst2utcms('2023/01/01 00:00:00')).toBe('2022-12-31T15:00:00.000Z')
    expect(jst2utcms('2023/01/01 00:00:00.000')).toBe('2022-12-31T15:00:00.000Z')
    expect(jst2utcms('2023/01/01 00:00:00.123')).toBe('2022-12-31T15:00:00.123Z')
    // YYYY-MM-DD
    expect(jst2utcms('2023-01-01 00:00:00')).toBe('2022-12-31T15:00:00.000Z')
    expect(jst2utcms('2023-01-01 00:00:00.000')).toBe('2022-12-31T15:00:00.000Z')
    expect(jst2utcms('2023-01-01 00:00:00.123')).toBe('2022-12-31T15:00:00.123Z')
    // TZ
    expect(jst2utcms('2023-01-01T00:00:00+09:00')).toBe('2022-12-31T15:00:00.000Z')
    expect(jst2utcms('2023-01-01T00:00:00.123+09:00')).toBe('2022-12-31T15:00:00.123Z')
    // 非推奨
    expect(jst2utcms('2023-01-01T00:00:00')).toBe('2022-12-31T15:00:00.000Z')
    expect(jst2utcms('2023-01-01T00:00:00.123')).toBe('2022-12-31T15:00:00.123Z')
  })
  test('ISO8601拡張形式(UTC)を日時(JST)に変換', () => {
    // ミリ秒なし
    expect(utc2jst('2022-12-31T15:00:00Z')).toBe('2023/01/01 00:00:00')
    expect(utc2jst('2022-12-31T15:00:00+00:00')).toBe('2023/01/01 00:00:00')
    // ミリ秒あり
    expect(utc2jst('2022-12-31T15:00:00.100Z')).toBe('2023/01/01 00:00:00')
    expect(utc2jst('2022-12-31T15:00:00.200+00:00')).toBe('2023/01/01 00:00:00')
  })
  test('ISO8601拡張形式(UTC)を日時(JST/日本形式)に変換', () => {
    // ミリ秒なし
    expect(utc2jst_jp('2022-12-31T15:00:00Z')).toBe('2023年01月01日(日) 00:00:00')
    expect(utc2jst_jp('2022-12-31T15:00:00+00:00')).toBe('2023年01月01日(日) 00:00:00')
    // ミリ秒あり
    expect(utc2jst_jp('2022-12-31T15:00:00.100Z')).toBe('2023年01月01日(日) 00:00:00')
    expect(utc2jst_jp('2022-12-31T15:00:00.200+00:00')).toBe('2023年01月01日(日) 00:00:00')
  })
  test('Date() をISO8601拡張形式(UTC)に変換(秒)', () => {
    expect(date2utc(new Date(1672498800000))).toBe('2022-12-31T15:00:00Z')
  })
  test('Date() をISO8601拡張形式(UTC)に変換(秒)', () => {
    expect(date2utcms(new Date(1672498800000))).toBe('2022-12-31T15:00:00.000Z')
  })
  test('UTC(ミリ秒) / 現在日時(new Date()) を日時(JST)に変換', () => {
    expect(utc2jst(1672498800000)).toBe('2023/01/01 00:00:00')
  })
  test('UTC(ミリ秒) / 現在日時(new Date()) を日時(JST/日本形式)に変換', () => {
    expect(utc2jst_jp(1672498800000)).toBe('2023年01月01日(日) 00:00:00')
  })
  test('数値なしの場合に---を表示', () => {
    expect(utc2jst()).toBe('---')
    expect(utc2jst_jp()).toBe('---')
  })
})
