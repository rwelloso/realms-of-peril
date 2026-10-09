import ItemDataModel from "../abstract/item-data-model.mjs";

const { HTMLField, StringField } = foundry.data.fields;

/**
 * Class/Kin talents: name + one prose paragraph, no structured mechanical sub-fields
 * (bonuses and triggers live in the text).
 */
export default class TalentData extends ItemDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.TALENT"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      description: new HTMLField(),
      // Loose reference to the originating Class/Kin identifier, for compendium filtering only —
      // not an enforced foreign key.
      source: new StringField({ required: false, blank: true })
    };
  }
}
