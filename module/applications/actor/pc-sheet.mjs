import BaseActorSheet from "./base-actor-sheet.mjs";

const TextEditor = foundry.applications.ux.TextEditor.implementation;

/**
 * level/maxHeavy/hp.max are recomputed every prepareDerivedData() (pc.mjs) — the template
 * renders them as <output>, never <input name="...">, so the player can't edit a value the next
 * prepare cycle would just overwrite.
 */
export default class PCSheet extends BaseActorSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["pc"],
    position: { width: 640, height: 780 }
  };

  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/actor/pc-sheet.hbs", scrollable: [""] }
  };

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    context.abilities = Object.entries(CONFIG.ROP.abilities).map(([key, cfg]) => {
      const ability = this.actor.system.abilities[key];
      return { key, label: cfg.label, score: ability.value, fail: ability.fail };
    });

    context.enrichedPockets = await TextEditor.enrichHTML(this.actor.system.pockets, {
      relativeTo: this.actor, secrets: this.actor.isOwner
    });

    // system.kin/background store an owned Item's id; a blank, null or stale id resolves to null,
    // which leaves the select on its empty option.
    context.kin = this.actor.items.get(this.actor.system.kin) ?? null;
    context.background = this.actor.items.get(this.actor.system.background) ?? null;
    context.kinOptions = this.actor.items.filter(i => i.type === "kin");
    context.backgroundOptions = this.actor.items.filter(i => i.type === "background");

    // Physical items vs. character features — two sections sharing BaseActorSheet#_prepareItemGroups.
    context.inventory = this._prepareItemGroups(["weapon", "armor", "gear", "container"]);
    context.features = this._prepareItemGroups(["class", "kin", "background", "talent", "power"]);

    return context;
  }
}
