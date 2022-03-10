import { Hono } from 'hono'
import { SHA256 } from 'crypto-js'
import { basicAuth } from 'hono/basic-auth'

declare global {
  interface RequestInit {
    backend: string
  }
}

export const app = new Hono()

app.get('/', (c) => c.text('Compute@Edge!'))

/*
if (req.http.User-Agent ~ "MalBot") {
  error 403 "Forbidden";
}
*/
app.use('*', async (c, next) => {
  const ua = c.req.header('User-Agent') || ''
  await next()
  if (ua.match(/MalBot/)) {
    c.res = c.text('Forbidden', 403)
  }
})

/* Basic Auth */
app.use(
  '/auth/*',
  basicAuth({
    username: 'compute',
    password: 'edge',
    hashFunction: (m: string) => SHA256(m).toString(),
  })
)
app.get('/auth/*', (c) => c.text('You are authorized!'))

/* backend httpbin.org - status */
app.get('/status/:status', (c) => {
  const backendResponse = fetch(c.req as Request, {
    backend: 'origin_a',
  })
  return backendResponse
})

/* backend httpbin.org - status */
app.get('/cache/:time', (c) => {
  const backendResponse = fetch(c.req as Request, {
    backend: 'origin_a',
  })
  return backendResponse
})

/* backend httpbin.org - json */
app.get('/json', (c) => {
  const backendResponse = fetch(c.req as Request, {
    backend: 'origin_a',
  })
  return backendResponse
})
