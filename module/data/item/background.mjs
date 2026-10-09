import ItemDataModel from "../abstract/item-data-model.mjs";

const { HTMLField } = foundry.data.fields;

/**
 * Character background. Chosen once at
 * character creation (not ranked, unlike Class/Kin talents). No carriedItemFields(): not a
 * physical/carried item — starting equipment/bonuses it grants are embedded in the prose.
 */
export default class BackgroundData extends ItemDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.BACKGROUND"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      description: new HTMLField()
    };
  }
}
