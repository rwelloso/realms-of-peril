import ItemDataModel from "../abstract/item-data-model.mjs";
import carriedItemFields from "./templates/carried-item.mjs";

const { HTMLField, StringField } = foundry.data.fields;

/**
 * General equipment and consumables in a single type. supplyDie is the d12->d4 depletion die;
 * there is no separate "quantity" field because the die itself represents how much is left.
 */
export default class GearData extends ItemDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.GEAR"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      ...carriedItemFields(),
      category: new StringField({ required: false, blank: true }),
      supplyDie: new StringField({
        required: false, nullable: true, initial: null, choices: ["d4", "d6", "d8", "d10", "d12"]
      }),
      // Same closed list Armor uses — Gear
      // still doesn't always occupy a slot, hence nullable.
      equipSlot: new StringField({
        required: false, nullable: true, initial: null, choices: () => Object.keys(CONFIG.ROP.equipSlots)
      }),
      description: new HTMLField()
    };
  }
}
