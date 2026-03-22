import { drhHandle } from "$lib/server/requestHandling/handle";
import { getAdminOrThrow } from "$lib/server/serverUtils/getUser";
import { userTable } from "$lib/server/db/schema";

const TABLE_NAMES = new Map([["users", userTable]]);

export const GET = drhHandle({
  async handler(ctx) {
    const admin = await getAdminOrThrow(ctx);
    const tableName = ctx.params.tableName;
    const table = TABLE_NAMES.get(tableName || "");

    if (!table)
      throw {
        status: 404,
        clientMsg: "not found",
        serverLog: "not found",
      };

    const rows = await ctx.db.select().from(userTable);

    return {
      msg: "",
      data: rows,
    };
  },
});
