import BaseItemSheet from "./base-item-sheet.mjs";

/**
 * Arcane Spell / Holy Prayer / Spirit Invocation, unified (power.mjs). deity/alwaysAvailable
 * only make sense for tradition "holy", terrainTags only for "spirit" — the template hides the
 * irrelevant fields, driven by isHoly/isSpirit below.
 */
export default class PowerSheet extends BaseItemSheet {
  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/item/power-sheet.hbs", scrollable: [""] }
  };

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.magicTraditions = CONFIG.ROP.magicTraditions;
    context.deities = CONFIG.ROP.deities;
    context.isHoly = this.item.system.tradition === "holy";
    context.isSpirit = this.item.system.tradition === "spirit";
    // terrainTags is a SetField of free-text strings — edited as one comma-separated field
    // instead of relying on the form's automatic same-name-input binding (simpler for a plain
    // Set of strings with no fixed choices).
    context.terrainTagsText = Array.from(this.item.system.terrainTags).join(", ");
    return context;
  }

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    this.element.querySelector("[data-terrain-tags]")?.addEventListener("change", async event => {
      const tags = event.target.value.split(",").map(t => t.trim()).filter(Boolean);
      await this.item.update({ "system.terrainTags": tags });
    });
  }
}
