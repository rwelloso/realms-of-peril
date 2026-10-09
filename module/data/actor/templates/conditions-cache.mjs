const { NumberField, TypedObjectField } = foundry.data.fields;

/**
 * Non-persisted mirror of the Active Effects currently applied to this Actor, keyed by
 * condition id, valued by rating (when the condition has one). Used by PC, Follower, and
 * Monster.
 *
 * @returns {Record<string, foundry.data.fields.DataField>} Fresh field instances on every call,
 *   meant to be spread into a defineSchema() result.
 */
export default function conditionsCacheFields() {
  return {
    conditions: new TypedObjectField(new NumberField({ integer: true, min: 0 }), {
      required: false, initial: {}, persisted: false, label: "ROP.Conditions"
    })
  };
}
