const { NumberField, SchemaField } = foundry.data.fields;

/**
 * Shared hit points tracker. Used by PC, Follower, and Monster.
 *
 * hp.value is clamped at 0;
 * overkill is a transient Death Check penalty, not a persisted field.
 *
 * @returns {Record<string, foundry.data.fields.DataField>} Fresh field instances on every call,
 *   meant to be spread into a defineSchema() result.
 */
export default function hitPointsFields() {
  return {
    hp: new SchemaField({
      value: new NumberField({
        required: true, integer: true, min: 0, initial: 0, label: "ROP.HITPOINTS.FIELDS.value.label"
      }),
      max: new NumberField({
        required: true, integer: true, min: 0, initial: 0, label: "ROP.HITPOINTS.FIELDS.max.label"
      })
    }, { label: "ROP.HitPoints" })
  };
}
