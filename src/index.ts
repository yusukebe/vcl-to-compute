import { app } from './app'
import { logger } from 'hono/logger'

app.use('*', logger())
app.fire()
