import * as dataModels from "./module/data/_module.mjs";
import * as applications from "./module/applications/_module.mjs";
import ROP from "./module/config.mjs";

Hooks.once("init", function() {
  CONFIG.ROP = ROP;
  CONFIG.Actor.dataModels = dataModels.actor.config;
  CONFIG.Item.dataModels = dataModels.item.config;
  Object.assign(CONFIG.ActiveEffect.dataModels, dataModels.activeEffect.config);

  const { DocumentSheetConfig } = foundry.applications.apps;

  DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.appv1.sheets.ActorSheet);
  for ( const [type, SheetClass] of Object.entries(applications.actor.config) ) {
    DocumentSheetConfig.registerSheet(Actor, "rop", SheetClass, {
      types: [type], makeDefault: true, label: `TYPES.Actor.${type}`
    });
  }

  DocumentSheetConfig.unregisterSheet(Item, "core", foundry.appv1.sheets.ItemSheet);
  for ( const [type, SheetClass] of Object.entries(applications.item.config) ) {
    DocumentSheetConfig.registerSheet(Item, "rop", SheetClass, {
      types: [type], makeDefault: true, label: `TYPES.Item.${type}`
    });
  }

  // Partials included via {{> "systems/rop/templates/..."}} from other .hbs files must be
  // preloaded — they aren't picked up automatically just by existing on disk.
  foundry.applications.handlebars.loadTemplates([
    "systems/rop/templates/actor/parts/conditions.hbs",
    "systems/rop/templates/actor/parts/inventory.hbs",
    "systems/rop/templates/item/parts/carried-item.hbs"
  ]);
});

Hooks.once("setup", function() {
  const statusEffects = [];
  for ( const [id, data] of Object.entries(CONFIG.ROP.conditionTypes) ) {
    // type: "condition" makes HUD toggles create the "condition" ActiveEffect subtype
    // (which carries system.level), not a typeless base effect.
    statusEffects.push({ id, type: "condition", name: data.label, img: data.img, hasRating: data.hasRating });
  }
  CONFIG.statusEffects = statusEffects;
});
