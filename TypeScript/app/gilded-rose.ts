import { Item } from "@/item";

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      const isGeneralItem = item.name !== AGED_BRIE && item.name !== BACKSTAGE_PASS && item.name !== SULFURAS;
      if (isGeneralItem) {
        this.updateItemQuality(item, -1);
      }
      if (item.name === AGED_BRIE) {
        this.updateItemQuality(item, 1);
      }
      if (item.name == BACKSTAGE_PASS) {
        this.updateItemQuality(item, 1);

        if (item.sellIn < 11) {
          this.updateItemQuality(item, 1);
        }
        if (item.sellIn < 6) {
          this.updateItemQuality(item, 1);
        }
      }
      if (item.name != SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (isGeneralItem) {
          this.updateItemQuality(item, -1);
        }
        if (item.name === AGED_BRIE) {
          this.updateItemQuality(item, 1);
        }
        if (item.name === BACKSTAGE_PASS) {
          this.resetQuality(item);
        }
      }
    }

    return this.items;
  }

  private updateItemQuality(item: Item, qualityOffset: number) {
    const newQuality = item.quality + qualityOffset;
    if (newQuality >= 0 && newQuality <= 50) {
      item.quality = item.quality + qualityOffset;
    }
  }

  private resetQuality(item: Item) {
    item.quality = item.quality - item.quality;
  }
}
