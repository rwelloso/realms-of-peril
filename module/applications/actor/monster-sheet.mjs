import BaseActorSheet from "./base-actor-sheet.mjs";

const TextEditor = foundry.applications.ux.TextEditor.implementation;

/**
 * Bestiary monster / named NPC (monster.mjs). attacks is an embedded ArrayField, not Items — no
 * inventory section either.
 */
export default class MonsterSheet extends BaseActorSheet {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["monster"],
    position: { width: 560, height: 680 },
    actions: {
      addAttack: MonsterSheet.#addAttack,
      deleteAttack: MonsterSheet.#deleteAttack
    }
  };

  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/actor/monster-sheet.hbs", scrollable: [""] }
  };

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.enrichedDescription = await TextEditor.enrichHTML(this.actor.system.description, {
      relativeTo: this.actor, secrets: this.actor.isOwner
    });
    return context;
  }

  /**
   * attacks[].name is required+non-blank (monster.mjs) — a bare push of "" breaks schema
   * validation on save, so the new entry needs a provisional name.
   */
  static async #addAttack(event, target) {
    const attacks = this.actor.system.toObject().attacks;
    attacks.push({ name: game.i18n.localize("ROP.SHEET.NewAttack"), description: "" });
    await this.actor.update({ "system.attacks": attacks });
  }

  static async #deleteAttack(event, target) {
    const index = Number(target.closest("[data-index]")?.dataset.index);
    const attacks = this.actor.system.toObject().attacks;
    attacks.splice(index, 1);
    await this.actor.update({ "system.attacks": attacks });
  }
}
