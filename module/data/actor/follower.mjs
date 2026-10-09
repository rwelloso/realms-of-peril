import ActorDataModel from "../abstract/actor-data-model.mjs";
import hitPointsFields from "./templates/hit-points.mjs";
import conditionsCacheFields from "./templates/conditions-cache.mjs";

const { HTMLField, NumberField, StringField } = foundry.data.fields;

/**
 * Covers Hireling, Companion, Beast Companion, and Familiar — same fields, no subtype field;
 * the distinction is narrative naming over the same schema.
 */
export default class FollowerData extends ActorDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.FOLLOWER"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      ...hitPointsFields(),
      ...conditionsCacheFields(),
      job: new StringField({ required: false, blank: true }),
      aptitude: new NumberField({ required: true, integer: true, initial: 0 }),
      loyalty: new NumberField({ required: true, integer: true, initial: 0 }),
      wage: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      damage: new StringField({ required: false, blank: true }),
      armor: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      maxHeavy: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      notes: new HTMLField()
    };
  }
}
