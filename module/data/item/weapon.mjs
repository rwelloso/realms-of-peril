import ItemDataModel from "../abstract/item-data-model.mjs";
import carriedItemFields from "./templates/carried-item.mjs";

const { HTMLField, NumberField, SchemaField, SetField, StringField } = foundry.data.fields;

/**
 * Weapon item.
 */
export default class WeaponData extends ItemDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.WEAPON"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      ...carriedItemFields(),
      damage: new SchemaField({
        // die's choices stay a plain array (not CONFIG.ROP) — dice notation doesn't need
        // translation; the sheet reads this.item.system.schema.fields.damage.fields.die.choices
        // directly instead of repeating the list.
        die: new StringField({ required: false, choices: ["d2", "d3", "d4", "d6", "d8", "d10", "d12"] }),
        type: new StringField({ required: false, choices: () => Object.keys(CONFIG.ROP.damageTypes) })
      }),
      range: new SetField(new StringField({ choices: () => Object.keys(CONFIG.ROP.weaponRanges) })),
      handedness: new StringField({ required: false, choices: () => Object.keys(CONFIG.ROP.handedness) }),
      properties: new SetField(new StringField({ choices: () => Object.keys(CONFIG.ROP.itemProperties) })),
      // Extra AR from weapons that also protect (e.g. a shield).
      armorBonus: new NumberField({ required: false, nullable: true, integer: true, initial: null }),
      description: new HTMLField()
    };
  }
}
