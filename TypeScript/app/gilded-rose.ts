import { Item } from "@/item";

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const CONJURED = "Conjured Mana Cake";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      const doesDegrade = item.name !== AGED_BRIE && item.name !== BACKSTAGE_PASS && item.name !== SULFURAS;
      const hasSellByDate = item.name != SULFURAS;

      if (doesDegrade) {
        const degradeRate = item.name === CONJURED ? 2 : 1;
        this.updateItemQuality(item, -1 * degradeRate);
      }
      if (item.name === AGED_BRIE) {
        this.updateItemQuality(item, 1);
      }
      if (item.name == BACKSTAGE_PASS) {
        this.updateBackstagePassQuality(item);
      }
      if (hasSellByDate) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (doesDegrade) {
          const degradeRate = item.name === CONJURED ? 2 : 1;
          this.updateItemQuality(item, -1 * degradeRate);
        }
        if (item.name === AGED_BRIE) {
          this.updateItemQuality(item, 1);
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

  private updateBackstagePassQuality(item: Item) {
    this.updateItemQuality(item, 1);

    if (item.sellIn < 11) {
      this.updateItemQuality(item, 1);
    }
    if (item.sellIn < 6) {
      this.updateItemQuality(item, 1);
    }
    if (item.sellIn < 1) {
      this.resetQuality(item);
    }
  }

  private resetQuality(item: Item) {
    item.quality = item.quality - item.quality;
  }
}
