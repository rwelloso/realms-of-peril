const { NumberField } = foundry.data.fields;

/**
 * Shared rank tracker. Used by Class and Kin — same mechanic.
 *
 * @returns {Record<string, foundry.data.fields.DataField>} Fresh field instances on every call,
 *   meant to be spread into a defineSchema() result.
 */
export default function rankedFeatureFields() {
  return {
    rank: new NumberField({
      required: true, integer: true, min: 0, initial: 0, label: "ROP.RANKEDFEATURE.FIELDS.rank.label"
    })
  };
}
