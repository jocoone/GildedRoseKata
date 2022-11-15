import { GildedRose } from "@/gilded-rose";
import { Item } from "@/item";

describe("Gilded Rose", () => {
  describe("Conjured Mana Cake", () => {
    it("should lower sellIn with 1 and quality with 2 each update cycle if sellIn date not passed", () => {
      const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 2, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(0);
    });

    it("should lower sellIn with 1 and quality with 4 each update cycle if sellIn date passed", () => {
      const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 0, 6)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(2);
    });

    it("should never lower the quality below 0", () => {
      const gildedRose = new GildedRose([new Item("General Test Item", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
});
