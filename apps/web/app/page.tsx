import { PrismaClient } from "@prisma/client";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const prisma = new PrismaClient();

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export default async function Home() {
  const users = await getUsers();
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: { id: Key | null | undefined; username: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
