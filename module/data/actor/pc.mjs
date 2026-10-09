import ActorDataModel from "../abstract/actor-data-model.mjs";
import hitPointsFields from "./templates/hit-points.mjs";
import conditionsCacheFields from "./templates/conditions-cache.mjs";

const { BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

export default class PCData extends ActorDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.PC"];

  /** @inheritDoc */
  static defineSchema() {
    const makeAbility = key => new SchemaField({
      // Explicit label outside the ROP.PC.FIELDS.* pattern: the ability names are shared with
      // other UI (check dropdown, sheet column header), so they live under ROP.Ability.*.
      value: new NumberField({
        required: true, integer: true, min: -3, max: 6, initial: 0, label: `ROP.Ability.${key}`
      }),
      // Same reasoning as value: the real path is abilities.<ability>.fail (5 distinct paths),
      // but lang/en.json only has one shared ROP.PC.FIELDS.abilities.fail.label — the
      // LOCALIZATION_PREFIXES auto-derivation would look for abilities.agility.fail.label etc.
      // and never find it, so this needs the explicit key too.
      fail: new BooleanField({ required: true, initial: false, label: "ROP.PC.FIELDS.abilities.fail.label" })
    });

    return {
      ...hitPointsFields(),
      ...conditionsCacheFields(),
      abilities: new SchemaField({
        agility: makeAbility("Agility"),
        charisma: makeAbility("Charisma"),
        intellect: makeAbility("Intellect"),
        perception: makeAbility("Perception"),
        strength: makeAbility("Strength")
      }),
      ar: new NumberField({ required: true, integer: true, initial: 0, persisted: false }),
      maxHeavy: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),
      level: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      // Id of an Item owned by this Actor; the sheet resolves it to the Item. blank: true accepts
      // the empty option of the sheet's select as-is.
      kin: new StringField({ required: false, nullable: true, blank: true, initial: null }),
      background: new StringField({ required: false, nullable: true, blank: true, initial: null }),
      pockets: new HTMLField()
    };
  }

  /** @inheritDoc */
  prepareDerivedData() {
    // Level is not edited directly — it's the sum of rank across every owned Class/Kin Item. Computed
    // before hp.max, which depends on it.
    this.level = this.parent.items.reduce((level, item) => {
      if ( ["class", "kin"].includes(item.type) ) level += item.system.rank ?? 0;
      return level;
    }, 0);

    // min: 0 on the maxHeavy field only cleans persisted source data — it doesn't clamp an
    // assignment made here in prepareDerivedData(), so the floor has to be applied explicitly.
    this.maxHeavy = Math.max(0, 1 + (this.abilities.strength.value ?? 0));

    this.hp.max = 10 + (this.abilities.strength.value ?? 0) + this.level;
  }
}
