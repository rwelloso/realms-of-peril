import BaseItemSheet from "./base-item-sheet.mjs";

export default class ArmorSheet extends BaseItemSheet {
  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/item/armor-sheet.hbs", scrollable: [""] }
  };

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.equipSlots = CONFIG.ROP.equipSlots;
    context.itemProperties = Object.entries(CONFIG.ROP.itemProperties)
      .filter(([, data]) => data.appliesTo.includes("armor"))
      .map(([key, data]) => ({ key, label: data.label, checked: this.item.system.properties.has(key) }));
    return context;
  }
}
