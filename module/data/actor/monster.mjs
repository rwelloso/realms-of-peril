import ActorDataModel from "../abstract/actor-data-model.mjs";
import hitPointsFields from "./templates/hit-points.mjs";
import conditionsCacheFields from "./templates/conditions-cache.mjs";

const { ArrayField, BooleanField, HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

/**
 * Bestiary monster / named NPC, including Minions (hd is a
 * string, not a number: normal HD is a die COUNT ("5" -> 5d6), Minion HD is already the
 * member-count FORMULA ("2d10") — two different semantics under the same printed label).
 *
 * attacks[].name/description auto-localize as ROP.MONSTER.FIELDS.attacks.element.name.label /
 * ...attacks.element.description.label — ArrayField exposes its inner field as a property named
 * "element" (official v14 ArrayField API docs).
 */
export default class MonsterData extends ActorDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.MONSTER"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      ...hitPointsFields(),
      ...conditionsCacheFields(),
      description: new HTMLField(),
      hd: new StringField({ required: false, blank: true }),
      minion: new BooleanField({ required: true, initial: false }),
      armor: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      morale: new NumberField({ required: true, integer: true, min: 1, max: 6, initial: 1 }),
      attacks: new ArrayField(new SchemaField({
        name: new StringField({ required: true, blank: false }),
        description: new HTMLField()
      })),
      parentGroup: new StringField({ required: false, blank: true })
    };
  }
}
