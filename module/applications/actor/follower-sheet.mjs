import BaseActorSheet from "./base-actor-sheet.mjs";

const TextEditor = foundry.applications.ux.TextEditor.implementation;

/**
 * Hireling / Companion / Beast Companion / Familiar (follower.mjs). Has an inventory section
 * (weapon/armor/gear/container) but no Features section: unlike the PC, a Follower has no
 * class/kin/background/talent/power Items of its own.
 */
export default class FollowerSheet extends BaseActorSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["rop", "actor", "follower"],
    position: { width: 480, height: 520 }
  };

  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/actor/follower-sheet.hbs", scrollable: [""] }
  };

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.hirelingJobs = CONFIG.ROP.hirelingJobs;
    context.enrichedNotes = await TextEditor.enrichHTML(this.actor.system.notes, {
      relativeTo: this.actor, secrets: this.actor.isOwner
    });
    context.inventory = this._prepareItemGroups(["weapon", "armor", "gear", "container"]);
    return context;
  }
}
