import ItemDataModel from "../abstract/item-data-model.mjs";
import carriedItemFields from "./templates/carried-item.mjs";

const { HTMLField, NumberField, SetField, StringField } = foundry.data.fields;

/**
 * A helm grants no AR and occupies the "head" slot, not "armor" — hence equipSlot is its own
 * field rather than assumed from the Item type.
 */
export default class ArmorData extends ItemDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.ARMOR"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      ...carriedItemFields(),
      armorRating: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      properties: new SetField(new StringField({ choices: () => Object.keys(CONFIG.ROP.itemProperties) })),
      equipSlot: new StringField({
        required: true, initial: "armor", choices: () => Object.keys(CONFIG.ROP.equipSlots)
      }),
      description: new HTMLField()
    };
  }
}
