import ItemDataModel from "../abstract/item-data-model.mjs";

const { BooleanField, HTMLField, SetField, StringField } = foundry.data.fields;

/**
 * Unifies Arcane Spell / Holy Prayer / Spirit Invocation. The three
 * traditions share the same real shape (name + prose description + optional provenance
 * metadata); they differ only in 2 conditional fields, not enough to justify 3 duplicated
 * schemas. The test ability is NEVER a field here — it's derived from `tradition` via
 * CONFIG.ROP.magicTraditions[tradition].ability (arcane->intellect, holy->charisma,
 * spirit->perception).
 */
export default class PowerData extends ItemDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.POWER"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      // initial: "arcane" (not the field's own blank default) — without an explicit initial
      // inside choices, a freshly created Power fails schema validation (StringField's implicit
      // "" initial isn't one of the 3 valid choices).
      tradition: new StringField({
        required: true, initial: "arcane", choices: () => Object.keys(CONFIG.ROP.magicTraditions)
      }),
      description: new HTMLField(),
      // Only populated when tradition === "holy" — which god's Spells/Boon this belongs to.
      deity: new StringField({ required: false, nullable: true, initial: null, choices: () => CONFIG.ROP.deities }),
      // Distinguishes a god's always-available Boon (true) from its 3 Favor-gated named Spells
      // (false) — both become Power items so a Cleric's Boon is a real owned Item too, not
      // flavor text with nowhere to live.
      alwaysAvailable: new BooleanField({ required: true, initial: false }),
      // Only populated when tradition === "spirit" — terrain where the spirit can be summoned,
      // not effect range.
      terrainTags: new SetField(new StringField())
    };
  }
}
