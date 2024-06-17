import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string} }>()
	// medium nYhjEORefwv0IdpA
// **************************************************************SignUp********************************************
app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	console.log("body is: ", body)
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})












//postgresql://neondb_owner:Ib7Ds8FQVENx@ep-young-recipe-a5ed7k09.us-east-2.aws.neon.tech/neondb?sslmode=require


// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiOGU4Y2U4NWYtMGFiYy00NDMxLTljYTItYjJiNWM5ZjRmYTljIiwidGVuYW50X2lkIjoiOTllNWViMTFhNjNkZWJkODZjNjExM2UyYzZjOGZkY2FhMWNiMTdiNzU5ZTBhNjlkNGZiNmRhYTE0OTAxNmUwZCIsImludGVybmFsX3NlY3JldCI6IjhkYjVlZDAzLTA4MWYtNGYxNS05ZjAxLThkNjY5YjM1Zjc4OSJ9.ssz7GBmUV_AuIPVjrulYuXVPrXATJuT01p0nfU6d5Gg"