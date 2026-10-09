const { NumberField } = foundry.data.fields;

/**
 * Data for a condition Active Effect: a single optional rating. Which condition it is comes
 * from ActiveEffect#statuses (matched against CONFIG.statusEffects), so there is no "type"
 * field here.
 */
export default class ConditionData extends foundry.abstract.TypeDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.CONDITION"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      // Rating (usually 1-3) — nullable because most
      // conditions are either binary or carry a fixed constant penalty baked into their own
      // definition text, not a per-instance GM-set number. See CONFIG.ROP.conditionTypes for
      // which of the 22 conditions actually use this.
      level: new NumberField({ required: false, nullable: true, integer: true, initial: null, min: 1 })
    };
  }
}
