import ItemDataModel from "../abstract/item-data-model.mjs";

const { HTMLField, NumberField } = foundry.data.fields;

/**
 * Backpack or other container with a slot capacity.
 * Does NOT include carriedItemFields(): a container doesn't have its own heavy-cost or live inside
 * another container (no nesting modeled), so it just gets its own standalone price field instead
 * of inheriting fields that wouldn't apply.
 */
export default class ContainerData extends ItemDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.CONTAINER"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      capacity: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      price: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
      description: new HTMLField()
    };
  }
}
