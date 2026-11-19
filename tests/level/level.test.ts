import { describe, expect, it } from "vitest";
import { computeLevel } from "@/lib/level";

const limiares = [10, 25, 50, 90, 150];

describe("computeLevel", () => {
  it("sem baseline e sem pesos retorna 0", () => {
    expect(computeLevel(0, 0, limiares)).toBe(0);
  });

  it("baseline 3 começa no nível 3 mesmo sem lições concluídas", () => {
    expect(computeLevel(3, 0, limiares)).toBe(3);
  });

  it("soma pesos e sobe de faixa ao passar do limiar", () => {
    expect(computeLevel(2, 30, limiares)).toBe(3);
  });

  it("nunca retorna acima de 5 nem abaixo de 0", () => {
    expect(computeLevel(5, 1000, limiares)).toBe(5);
    expect(computeLevel(0, -100, limiares)).toBe(0);
  });

  it("baseline 6 é limitado a 5 e peso negativo é saneado para 0", () => {
    expect(computeLevel(6, 0, limiares)).toBe(5);
    expect(computeLevel(0, -10, limiares)).toBe(0);
  });
});
