import BaseItemSheet from "./base-item-sheet.mjs";

export default class GearSheet extends BaseItemSheet {
  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/item/gear-sheet.hbs", scrollable: [""] }
  };

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.equipSlots = CONFIG.ROP.equipSlots;
    // Dice notation doesn't need translation — read the choices off the schema field instead of
    // repeating them in the template (same reasoning as WeaponSheet#damageDice).
    context.supplyDice = this.item.system.schema.fields.supplyDie.choices.map(die => ({
      die, selected: die === this.item.system.supplyDie
    }));
    return context;
  }
}
