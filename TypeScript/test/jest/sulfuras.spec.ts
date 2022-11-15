import { GildedRose } from "@/gilded-rose";
import { Item } from "@/item";

describe("Gilded Rose", () => {
  describe("Sulfuras", () => {
    it("should never decrease in sellIn nor quality", () => {
      const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 2, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(2);
      expect(items[0].quality).toBe(2);
    });
  });
});
