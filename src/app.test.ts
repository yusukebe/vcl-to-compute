import makeServiceWorkerEnv from 'service-worker-mock'

import { app } from './app'

describe('basic', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  }),
    test('basic', async () => {
      const req = new Request('/', { method: 'GET' })
      const res = await app.dispatch(req)
      expect(res.status).toBe(200)
    })
})
