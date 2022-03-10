import makeServiceWorkerEnv from 'service-worker-mock'

import { app } from './app'

describe('basic', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test('GET /', async () => {
    const req = new Request('/', { method: 'GET' })
    const res = await app.dispatch(req)
    expect(res.status).toBe(200)
  })

  test('Access control for a Bot', async () => {
    const req = new Request('/')
    req.headers.set('User-Agent', 'MalBot/0.01')
    const res = await app.dispatch(req)
    expect(res.status).toBe(403)
  })

  test('Unauthorized when using basic auth', async () => {
    const req = new Request('/auth/aaa')
    const res = await app.dispatch(req)
    expect(res.status).toBe(401)
  })

  test('Authorized when using basic auth', async () => {
    const credential = Buffer.from('compute:edge').toString('base64')
    const req = new Request('/auth/aaa')
    req.headers.set('Authorization', `Basic ${credential}`)
    const res = await app.dispatch(req)
    expect(res.status).toBe(200)
  })
})
