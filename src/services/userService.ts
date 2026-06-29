import { ValidationError } from "../types";

type UserRow = { name: string };

export interface UserDatabase {
  execute(query: string, params: readonly string[]): { rows: UserRow[] };
}

export function getUser(id: string, db: UserDatabase): string | null {
  if (typeof id !== "string" || id.trim().length === 0) {
    throw new ValidationError("id obbligatorio e non vuoto");
  }

  const result = db.execute("SELECT name FROM users WHERE id = ?", [id]);
  return result.rows[0]?.name ?? null;
}
