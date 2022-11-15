import { GildedRose } from "@/gilded-rose";
import { Item } from "@/item";

describe("Gilded Rose", () => {
  describe("Backstage Pass", () => {
    it("should increase in quality", () => {
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(19);
      expect(items[0].quality).toBe(3);
    });

    it("should increase in quality with 2 if sellIn is within 10 days", () => {
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(4);
    });

    it("should increase in quality with 3 if sellIn is within 5 days", () => {
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(5);
    });

    it("should drop quality to 0 if sellIn day has passed", () => {
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
});
