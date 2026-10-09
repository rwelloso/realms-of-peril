import BaseActorSheet from "./base-actor-sheet.mjs";

/**
 * level/maxHeavy/hp.max are recomputed every prepareDerivedData() (pc.mjs) — the template
 * renders them as <output>, never <input name="...">, so the player can't edit a value the next
 * prepare cycle would just overwrite.
 */
export default class PCSheet extends BaseActorSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["rop", "actor", "pc"],
    position: { width: 960, height: 1000 }
  };

  /** @override */
  static PARTS = {
    portrait: { template: "systems/rop/templates/actor/pc/portrait.hbs" },
    identity: { template: "systems/rop/templates/actor/pc/identity.hbs" },
    side: { template: "systems/rop/templates/actor/pc/side.hbs", scrollable: [""] },
    tabs: { template: "systems/rop/templates/actor/pc/tabs.hbs" },
    main: {
      template: "systems/rop/templates/actor/pc/main.hbs",
      templates: ["systems/rop/templates/actor/pc/item-row.hbs"],
      scrollable: [""]
    }
  };

  /** @override */
  static TABS = {
    primary: {
      initial: "main",
      labelPrefix: "ROP.SHEET.Tab",
      tabs: [{ id: "main" }]
    }
  };

  /** Physical item types shown as equipment rows on the Main tab. */
  static EQUIPMENT_TYPES = ["weapon", "armor", "gear", "container"];

  /** Character feature types, listed on the Main tab until they get their own tabs. */
  static FEATURE_TYPES = ["class", "kin", "background", "talent", "power"];

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.tabs = this._prepareTabs("primary");
    return context;
  }

  /** @inheritDoc */
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    switch ( partId ) {
      case "identity": this.#prepareIdentity(context); break;
      case "side": this.#prepareSide(context); break;
      case "main": this.#prepareMain(context); break;
    }
    return context;
  }

  /**
   * Name, level, XP, kin, background, class ranks and the HP/AR/Heavy line.
   * @param {object} context
   */
  #prepareIdentity(context) {
    // system.kin/background store an owned Item's id; a blank, null or stale id resolves to null,
    // which leaves the select on its empty option.
    context.kin = this.actor.items.get(this.actor.system.kin) ?? null;
    context.background = this.actor.items.get(this.actor.system.background) ?? null;
    context.kinOptions = this.actor.items.filter(i => i.type === "kin");
    context.backgroundOptions = this.actor.items.filter(i => i.type === "background");

    const ranked = this.actor.items
      .filter(i => (i.type === "class") && ((i.system.rank ?? 0) > 0))
      .map(i => `${i.name} ${i.system.rank}`);
    context.classSummary = ranked.length ? ranked.join(" · ") : game.i18n.localize("ROP.SHEET.NoRanks");

    // Display only: the carried heavy count is not stored anywhere yet.
    const carried = this.actor.items.reduce((total, i) => total + (Number(i.system.heavyCost) || 0), 0);
    context.heavy = { value: carried, max: this.actor.system.maxHeavy };
  }

  /**
   * Abilities, the active conditions and the ones that can still be added.
   * @param {object} context
   */
  #prepareSide(context) {
    context.abilities = Object.entries(CONFIG.ROP.abilities).map(([key, cfg]) => {
      const ability = this.actor.system.abilities[key];
      return { key, label: cfg.label, score: ability.value, fail: ability.fail };
    });
    const conditions = this._prepareConditions();
    context.activeConditions = conditions.filter(c => c.active);
    context.availableConditions = conditions.filter(c => !c.active)
      .sort((a, b) => game.i18n.localize(a.label).localeCompare(game.i18n.localize(b.label)));
  }

  /**
   * Item rows of the Main tab.
   * @param {object} context
   */
  #prepareMain(context) {
    context.tab = context.tabs.main;

    // Physical items vs. character features — two sections sharing BaseActorSheet#_prepareItemGroups.
    const inventory = this._prepareItemGroups(PCSheet.EQUIPMENT_TYPES);
    const features = this._prepareItemGroups(PCSheet.FEATURE_TYPES);

    context.equipment = Object.values(inventory).flat().map(item => this.#itemRow(item));
    context.features = Object.values(features).flat().map(item => this.#itemRow(item));
    context.equipmentTypes = PCSheet.EQUIPMENT_TYPES.map(id => ({ id, label: game.i18n.localize(`TYPES.Item.${id}`) }));
    context.featureTypes = PCSheet.FEATURE_TYPES.map(id => ({ id, label: game.i18n.localize(`TYPES.Item.${id}`) }));
  }

  /**
   * One list row: type marker, name, short description line and weight marker.
   * @param {Item} item
   */
  #itemRow(item) {
    const typeLabel = game.i18n.localize(`TYPES.Item.${item.type}`);
    const heavy = Number(item.system.heavyCost) || 0;
    const weight = heavy >= 2 ? "weight2" : (heavy === 1 ? "weight" : null);
    return {
      id: item.id,
      name: item.name,
      typeLabel,
      initial: typeLabel.charAt(0).toUpperCase(),
      meta: [typeLabel, ...this.#itemDetails(item)].filter(Boolean).join(" · "),
      weightIcon: weight ? `systems/rop/icons/ui/${weight}.svg` : null,
      weightLabel: weight ? game.i18n.localize(heavy >= 2 ? "ROP.SHEET.VeryHeavy" : "ROP.SHEET.HeavyItem") : ""
    };
  }

  /**
   * The few stats worth showing under the item name, by item type.
   * @param {Item} item
   * @returns {string[]}
   */
  #itemDetails(item) {
    const system = item.system;
    const label = (list, key) => {
      const entry = CONFIG.ROP[list]?.[key];
      return entry ? game.i18n.localize(entry.label) : key;
    };
    switch ( item.type ) {
      case "weapon": return [
        system.damage?.die,
        system.damage?.type ? label("damageTypes", system.damage.type) : null,
        Array.from(system.properties ?? []).map(p => label("itemProperties", p)).join(", ")
      ];
      case "armor": return [game.i18n.format("ROP.SHEET.MetaArmor", { value: system.armorRating ?? 0 })];
      case "container": return [game.i18n.format("ROP.SHEET.MetaCapacity", { value: system.capacity ?? 0 })];
      case "gear": return [system.supplyDie ? game.i18n.format("ROP.SHEET.MetaSupply", { die: system.supplyDie }) : null];
      case "class":
      case "kin": return [game.i18n.format("ROP.SHEET.MetaRank", { value: system.rank ?? 0 })];
      case "talent": return [system.source];
      case "power": return [system.tradition ? label("magicTraditions", system.tradition) : null];
      default: return [];
    }
  }
}
