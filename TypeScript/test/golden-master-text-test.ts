import { Item } from "@/item";
import { GildedRose } from "@/gilded-rose";

const items = [
  new Item("+5 Dexterity Vest", 10, 20), //
  new Item("Aged Brie", 2, 0), //
  new Item("Elixir of the Mongoose", 5, 7), //
  new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  new Item("Conjured Mana Cake", 3, 10)
];

function runFixture(days = 30) {
  const gildedRose = new GildedRose(items);

  let result = "OMGHAI!\n";
  for (let i = 0; i <= days; i++) {
    result += "-------- day " + i + " --------" + "\n";
    result += "name, sellIn, quality" + "\n";
    items.forEach((element) => {
      result += element.name + ", " + element.sellIn + ", " + element.quality + "\n";
    });
    result += "\n";
    gildedRose.updateQuality();
  }

  return result;
}

export { runFixture };
