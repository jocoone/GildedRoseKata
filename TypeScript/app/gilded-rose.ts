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
      const hasSellByDate = item.name != SULFURAS;

      this.updateItemQuality(item);
      if (hasSellByDate) {
        item.sellIn = item.sellIn - 1;
      }
    }

    return this.items;
  }

  private updateItemQuality(item: Item): void {
    const doesDecrease = item.name !== AGED_BRIE && item.name !== BACKSTAGE_PASS && item.name !== SULFURAS;
    const isExpired = item.sellIn < 1;

    if (doesDecrease) {
      const decreaseRate = this.getDecreaseRate(item);
      const decrease = isExpired ? 2 * decreaseRate : decreaseRate;
      this.adjustItemQuality(item, decrease);
    }
    if (item.name === AGED_BRIE) {
      const increase = isExpired ? 2 : 1;
      this.adjustItemQuality(item, increase);
    }
    if (item.name == BACKSTAGE_PASS) {
      this.updateBackstagePassQuality(item);
    }
  }

  private adjustItemQuality(item: Item, qualityOffset: number) {
    const updatedQuality = item.quality + qualityOffset;
    item.quality = this.roundQuality(updatedQuality);
  }

  private updateBackstagePassQuality(item: Item) {
    this.adjustItemQuality(item, 1);

    if (item.sellIn < 11) {
      this.adjustItemQuality(item, 1);
    }
    if (item.sellIn < 6) {
      this.adjustItemQuality(item, 1);
    }
    if (item.sellIn < 1) {
      this.resetQuality(item);
    }
  }

  private getDecreaseRate(item: Item) {
    return item.name === CONJURED ? -2 : -1;
  }

  private roundQuality(quality: number) {
    if (quality < 0) return 0;
    else if (quality > 50) return 50;
    return quality;
  }

  private resetQuality(item: Item) {
    item.quality = 0;
  }
}
