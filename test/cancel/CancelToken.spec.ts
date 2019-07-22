/*
 * @Desc:
 * @Author: ykst
 * @Date: 2019-07-22 22:17:11
 * @LastEditors: ykst
 * @LastEditTime: 2019-07-22 22:43:16
 */
import CancelToken from '../../src/cancel/cancelToken'
import { Canceler } from '../../src/types'
import Cancel from '../../src/cancel/Cancel'

describe('cancel: CancelToken', () => {
  describe('reason', () => {
    test('should returns a Cancel if cancellation has been requested', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled.')
    })

    test('should has no side effect if call cancellation for multi times', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      cancel!('Operation has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel))
      expect(token.reason!.message).toBe('Operation has been canceled.')
    })

    test('should returns a Promise that resolves when cancellation is request', done => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      token.promise.then(value => {
        expect(value).toEqual(expect.any(Cancel))
        expect(value.message).toBe('Operation has been canceled.')
        done()
      })
      cancel!('Operation has been canceled.')
    })
  })

  describe('throwIfRequested', () => {
    test('should throws if cancellation has been requested', () => {
      let cancel: Canceler
      const token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Operation has been canceled.')
      try {
        token.throwIfRequested()
        fail('Expected throwIfRequested to throw')
      } catch (error) {
        if (!(error instanceof Cancel)) {
          fail('Expected throwIfRequested to throw a Cancel, but test threw ' + error + '.')
        }
        expect(error.message).toBe('Operation has been canceled.')
      }
    })

    test('should does not throw if cancellation has not been requested', () => {
      const token = new CancelToken(() => {})
      token.throwIfRequested()
    })
  })

  describe('source', () => {
    test('should returns an object containing token and cancel function', () => {
      const source = CancelToken.source()
      expect(source.token).toEqual(expect.any(CancelToken))
      expect(source.cancel).toEqual(expect.any(Function))
      expect(source.token.reason).toBeUndefined()
      source.cancel('Operation has been canceled.')
      expect(source.token.reason).toEqual(expect.any(Cancel))
      expect(source.token.reason!.message).toBe('Operation has been canceled.')
    })
  })
})
