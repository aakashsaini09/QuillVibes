import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { sign } from 'hono/jwt';
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();
app.post('/api/v1/signup', async(c) => {
const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const body = await c.req.json()
const user = await prisma.user.create({
  data: {
    email: body.email,
    password: body.password,
  },
})
const token = await sign({ id: user.id }, "secret");
		return c.json({ 
      jwt: token
     });
})
app.post('/api/v1/signin', (c) => {
  return c.text('signup successfully')
})

export default app
// 120svIQ8cytv2Lle
// default
// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYzFiNGIyNTAtODA4ZS00NTNmLWJhYzUtOTA1NGRjNmRjYjE5IiwidGVuYW50X2lkIjoiZTIwYjFmYWYxNzdjZGZhMTEzNWFlNDJiOTEyNDc5YmIzNjE1MWI5YWE1MDU3YjIwMGY5MjVjYjk4MzFjNTRiYSIsImludGVybmFsX3NlY3JldCI6IjQ3MzRkNTE3LTVjMDktNDU0Yy05ZTg1LTk2NzJiZjIzZTkzYyJ9.AUja2uUG-Sy1Txgm03R4mw7IBoJ10C3CDJuLalsLaXI"
// port change
// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDk4NjQzNDAtOGFjZS00M2QzLThmNDUtMjZmM2NjMzM4ZGMwIiwidGVuYW50X2lkIjoiMDlmYmQ0NjNjNzRjYjJjYmQxY2E1NmRiODhiOTk1OTkwOGNkZTNhNzE3MGUwYmE5MDM2NzVjMTRjYjc2NTk2MCIsImludGVybmFsX3NlY3JldCI6IjU3NzU4Zjg3LTgwMzYtNGMyZC1hODIzLWIzNzhjNjZmZGE5NyJ9.r_tioNl1Rr8ZX7yh3k22_tPKgGKn456x3rZ6OojMO98"
