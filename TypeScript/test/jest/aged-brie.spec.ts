import { GildedRose } from "@/gilded-rose";
import { Item } from "@/item";

describe("Gilded Rose", () => {
  describe("Aged Brie", () => {
    it("should increase in quality", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 2, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(3);
    });

    it("should never have a quality above 50", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 2, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(50);
    });

    it("should double increase in quality if sellIn has passed", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(12);
    });

    it("should never have a quality above 50", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(50);
    });
  });
});
