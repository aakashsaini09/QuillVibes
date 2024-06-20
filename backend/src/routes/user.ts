
import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { sign, verify } from 'hono/jwt';
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SEC: string
	}
}>();

// *********************************************signUp route********************************************
userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
        },
      })
      const token = await sign({ id: user.id }, c.env.JWT_SEC);
          return c.json({ 
            jwt: token
           });
    } catch (err) {
      c.status(411)
      return c.text("Invalid!!!")
    }
    })
    // *********************************************signIn route********************************************
    userRouter.post('/signin', async(c) => {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });
    if(!user){
      c.status(403);
      return c.json({error: "Invalid Credintial"});
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SEC);
            return c.json({ jwt: jwt, message: "Login Successfully" });
    })