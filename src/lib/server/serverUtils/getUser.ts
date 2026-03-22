import type { RequestEvent } from "@sveltejs/kit";
import { verifyToken } from "./jwt";
import { getPostgresDb } from "../db/connect";
import { userTable } from "../db/schema";
import { isAdmin } from "../db/schemas/user";
import { eq } from "drizzle-orm";

const DEFAULT_THROW = {
  type: "cookie",
  status: 401,
  severLog: "failed getting user from cookie",
  clientMsg: "you must be logged in to do this",
};

export const getUserOrThrow = async (ctx: RequestEvent) => {
  const token = ctx.cookies.get("dugwtf-token");

  if (!token) throw DEFAULT_THROW;

  let parsed: any;
  try {
    parsed = verifyToken(token);
  } catch {
    throw DEFAULT_THROW;
  }

  const db = getPostgresDb();

  if (!db)
    throw {
      type: "cookie",
      status: 503,
      severLog: "could not get cookie because database is down",
      clientMsg: "database is downn",
    };

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, parsed.id));

  if (!user) throw DEFAULT_THROW;

  return user;
};

export const getUserOrNull = async (ctx: RequestEvent) => {
  const token = ctx.cookies.get("dugwtf-token");

  if (!token) return null;

  let parsed: any;
  try {
    parsed = verifyToken(token);
  } catch {
    return null;
  }

  const db = getPostgresDb();

  if (!db) return null;

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, parsed.id));

  if (!user) return null;

  return user;
};

export const getAdminOrThrow = async (ctx: RequestEvent) => {
  const user = await getUserOrNull(ctx);
  if (!user)
    throw {
      status: 404,
      clientMsg: "not found",
      serverLog: "not logged in as admin",
    };
  if (!isAdmin(user))
    throw {
      status: 404,
      clientMsg: "not found",
      serverLog: "not logged in as admin",
    };
  return user;
};
