import BaseItemSheet from "./base-item-sheet.mjs";

export default class WeaponSheet extends BaseItemSheet {
  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/item/weapon-sheet.hbs", scrollable: [""] }
  };

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.damageTypes = CONFIG.ROP.damageTypes;
    context.weaponRanges = CONFIG.ROP.weaponRanges;
    context.handedness = CONFIG.ROP.handedness;
    // Only show properties curated for this Item type.
    context.itemProperties = Object.entries(CONFIG.ROP.itemProperties)
      .filter(([, data]) => data.appliesTo.includes("weapon"))
      .map(([key, data]) => ({ key, label: data.label, checked: this.item.system.properties.has(key) }));
    context.rangeChecks = Object.entries(CONFIG.ROP.weaponRanges)
      .map(([key, data]) => ({ key, label: data.label, checked: this.item.system.range.has(key) }));
    // Dice notation doesn't need translation, so the list isn't in CONFIG.ROP — read the
    // choices straight off the schema field instead of repeating them here or in the template
    // (StringField#choices is a public, documented property: foundryvtt.com/api/classes/
    // foundry.data.fields.StringField.html).
    context.damageDice = this.item.system.schema.fields.damage.fields.die.choices.map(die => ({
      die, selected: die === this.item.system.damage.die
    }));
    return context;
  }
}
