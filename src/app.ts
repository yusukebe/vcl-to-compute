import { Hono } from 'hono'
import { SHA256 } from 'crypto-js'
import { basicAuth } from 'hono/basic-auth'

export const app = new Hono()

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

app.get('/', (c) => c.text('Hello! Compute@Edge!'))
app.get('/hello/:name', (c) => {
  return c.text(`Hello ${c.req.param('name')}!!`)
})
