import { describe, expect, it } from "vitest";
import { sessionUserId } from "@/lib/session-user";

describe("sessionUserId", () => {
  it("retorna o id quando a sessão é autenticada", () => {
    expect(sessionUserId({ user: { id: "u1" } })).toBe("u1");
  });

  it("retorna null quando não há sessão", () => {
    expect(sessionUserId(null)).toBeNull();
    expect(sessionUserId({ user: {} })).toBeNull();
  });
});
