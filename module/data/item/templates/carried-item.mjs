const { NumberField, StringField } = foundry.data.fields;

/**
 * Shared price/weight-abstract/container tracker. Used by Weapon, Armor, and Gear.
 *
 * @returns {Record<string, foundry.data.fields.DataField>} Fresh field instances on every call,
 *   meant to be spread into a defineSchema() result.
 */
export default function carriedItemFields() {
  return {
    price: new NumberField({
      required: true, integer: true, min: 0, initial: 0, label: "ROP.CARRIEDITEM.FIELDS.price.label"
    }),
    // 0 = normal, 1 = heavy, 2 = very heavy (counts as two heavy items).
    heavyCost: new NumberField({
      required: true, integer: true, choices: [0, 1, 2], initial: 0, label: "ROP.CARRIEDITEM.FIELDS.heavyCost.label"
    }),
    container: new StringField({
      required: false, nullable: true, initial: null, label: "ROP.CARRIEDITEM.FIELDS.container.label"
    })
  };
}
