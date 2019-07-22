/*
 * @Desc:
 * @Author: ykst
 * @Date: 2019-07-22 22:12:49
 * @LastEditors: ykst
 * @LastEditTime: 2019-07-22 22:16:28
 */
import Cancel, { isCancel } from '../../src/cancel/Cancel'

describe('cancel: Cancel', () => {
  test('should returns correct result when message is specified', () => {
    const cancel = new Cancel('Operation has been canceled.')
    expect(cancel.message).toBe('Operation has been canceled.')
  })

  test('should returns true if value is a Cancel', () => {
    expect(isCancel(new Cancel())).toBeTruthy()
  })

  test('should returns false if value is not a Cancel', () => {
    expect(isCancel({ foo: 'bar' })).toBeFalsy()
  })
})
