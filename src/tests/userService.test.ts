import { describe, expect, it, vi } from "vitest";
import { getUser, type UserDatabase } from "../services/userService";
import { ValidationError } from "../types";

describe("getUser", () => {
  it("ritorna il nome dell'utente quando presente", () => {
    const db: UserDatabase = {
      execute: vi.fn().mockReturnValue({ rows: [{ name: "Ada" }] }),
    };

    expect(getUser("u1", db)).toBe("Ada");
    expect(db.execute).toHaveBeenCalledWith(
      "SELECT name FROM users WHERE id = ?",
      ["u1"],
    );
  });

  it("ritorna null quando l'utente non esiste", () => {
    const db: UserDatabase = {
      execute: vi.fn().mockReturnValue({ rows: [] }),
    };

    expect(getUser("missing", db)).toBeNull();
  });

  it("rifiuta un id non valido", () => {
    const db: UserDatabase = {
      execute: vi.fn(),
    };

    expect(() => getUser("   ", db)).toThrow(ValidationError);
    expect(db.execute).not.toHaveBeenCalled();
  });
});
