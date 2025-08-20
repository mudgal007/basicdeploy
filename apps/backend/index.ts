/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  const prisma = new PrismaClient();
  prisma.user.findMany()
    .then((users: any) => {
      res.json(users);
    })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((err: { message: any; }) => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  const prisma = new PrismaClient();
        prisma.user.create({
    data: {
      username,
      password
    }
  })
    .then((user: any) => {
      res.status(201).json(user);
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((err: { message: any; }) => {
      res.status(500).json({ error: err.message });
    });
})

app.listen(8080);