import { GildedRose } from "@/gilded-rose";
import { Item } from "@/item";

describe("Gilded Rose", () => {
  describe("General Item", () => {
    it("should lower sellIn and quality with 1 each update cycle", () => {
      const gildedRose = new GildedRose([new Item("General Test Item", 2, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(1);
    });

    it("should lower sellIn and quality with 1 each update cycle if sellIn has not been passed", () => {
      const gildedRose = new GildedRose([new Item("General Test Item", 1, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(1);
    });

    it("should lower quality twice as fast if sellIn date has passed", () => {
      const gildedRose = new GildedRose([new Item("General Test Item", 0, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });

    it("should never lower the quality below 0", () => {
      const gildedRose = new GildedRose([new Item("General Test Item", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });

    it("should never lower the quality below 0 (starting from 1)", () => {
      const gildedRose = new GildedRose([new Item("General Test Item", 0, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
});
