import { createSafeActionClient } from "next-safe-action";

import type { NeonDbError } from "@neondatabase/serverless";

export const actionClient = createSafeActionClient({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleServerError(e, utils) {
    if (e.constructor.name === "NeonDbError") {
      const { code, detail } = e as NeonDbError;

      if (code === "23505") {
        return `Unique entry required. ${detail}`;
      }
    }

    if (e.constructor.name === "NeonDbError") {
      return "Database Error: Your data did not save. Support will be notified.";
    }

    return e.message;
  },
});
