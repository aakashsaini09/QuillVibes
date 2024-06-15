import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/signup', (c) => {
  return c.text('Hello Hono. its signoup!')
})
app.post('/api/v1/signin', (c) => { 
  return c.text('Hello Hono!')
})
app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

// neon db url postgresql://first_owner:3PQDV6umNjst@ep-late-snow-a5o89d38.us-east-2.aws.neon.tech/datab?sslmode=require


// prisma accelrate key DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiOGU4Y2U4NWYtMGFiYy00NDMxLTljYTItYjJiNWM5ZjRmYTljIiwidGVuYW50X2lkIjoiOTllNWViMTFhNjNkZWJkODZjNjExM2UyYzZjOGZkY2FhMWNiMTdiNzU5ZTBhNjlkNGZiNmRhYTE0OTAxNmUwZCIsImludGVybmFsX3NlY3JldCI6IjhkYjVlZDAzLTA4MWYtNGYxNS05ZjAxLThkNjY5YjM1Zjc4OSJ9.ssz7GBmUV_AuIPVjrulYuXVPrXATJuT01p0nfU6d5Gg"