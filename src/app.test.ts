import makeServiceWorkerEnv from 'service-worker-mock'
import makeFetchMock from 'service-worker-mock/fetch'

import { app } from './app'

describe('basic', () => {
  beforeEach(() => {
    Object.assign(global, { fetch: makeFetchMock }, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test('GET /', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Compute@Edge!')
  })

  test('Access control for a Bot', async () => {
    const req = new Request('/')
    req.headers.set('User-Agent', 'MalBot/0.01')
    const res = await app.request(req)
    expect(res.status).toBe(403)
  })

  test('Basic auth - Unauthorized', async () => {
    const res = await app.request('/auth/aaa')
    expect(res.status).toBe(401)
  })

  test('Basic auth - Authorized', async () => {
    const credential = Buffer.from('compute:edge').toString('base64')
    const req = new Request('/auth/aaa')
    req.headers.set('Authorization', `Basic ${credential}`)
    const res = await app.request(req)
    expect(res.status).toBe(200)
  })

  test('Backend status code - 200', async () => {
    const res = await app.request('/status/200')
    expect(res.status).toBe(200)
  })

  // Can't test with backend
  test.skip('Backend status code - 404', async () => {
    const res = await app.request('/status/404')
    expect(res.status).toBe(404)
  })
})
