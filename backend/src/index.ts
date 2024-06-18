import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/signup', (c) => {
  return c.text('signup successfully')
})
app.post('/api/v1/signin', (c) => {
  return c.text('signup successfully')
})

export default app
