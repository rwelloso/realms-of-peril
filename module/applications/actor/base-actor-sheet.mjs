const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

/**
 * Shared behavior for the 3 Actor type sheets: inventory item create/delete/open (used by the
 * PC and Follower sheets) and the condition list (used by all 3).
 * Rating editing (for conditions with hasRating: true) isn't a DEFAULT_OPTIONS action because
 * ApplicationV2 actions only bind "click" — a number input needs "change", wired in _onRender.
 */
export default class BaseActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["rop", "actor"],
    position: { width: 620, height: 700 },
    form: { submitOnChange: true },
    actions: {
      createItem: BaseActorSheet.#createItem,
      deleteItem: BaseActorSheet.#deleteItem,
      editItem: BaseActorSheet.#editItem,
      toggleCondition: BaseActorSheet.#toggleCondition,
      removeCondition: BaseActorSheet.#removeCondition
    }
  };

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;
    context.conditions = this._prepareConditions();
    return context;
  }

  /**
   * Group owned Items of the given types by type, one bucket per type (even if empty) — used by
   * PCSheet (split into Inventory/Features, two calls with different type lists) and
   * FollowerSheet (Inventory only).
   * @param {string[]} types
   */
  _prepareItemGroups(types) {
    const groups = {};
    for ( const type of types ) groups[type] = [];
    for ( const item of this.actor.items ) {
      if ( types.includes(item.type) ) groups[item.type].push(item);
    }
    return groups;
  }

  /**
   * Build the 22-entry condition list for the sheet: whether it's active on this Actor (via the
   * native Actor#statuses set) and, for conditions with hasRating, the current level stored on
   * the matching ActiveEffect (the rating lives on each effect instance, not on the Actor).
   */
  _prepareConditions() {
    return Object.entries(CONFIG.ROP.conditionTypes).map(([id, data]) => {
      const effect = this.actor.effects.find(e => e.statuses.has(id));
      return {
        id,
        label: data.label,
        hasRating: data.hasRating,
        active: !!effect,
        level: effect?.system?.level ?? null
      };
    });
  }

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    this.element.querySelectorAll("[data-condition-rating]").forEach(input => {
      input.addEventListener("change", this.#onChangeConditionRating.bind(this));
    });
    // "+ Add condition" and "+ Item" are selects: picking an option acts, then the select resets.
    this.element.querySelectorAll("[data-add-condition]").forEach(select => {
      select.addEventListener("change", this.#onAddCondition.bind(this));
    });
    this.element.querySelectorAll("[data-add-item]").forEach(select => {
      select.addEventListener("change", this.#onAddItem.bind(this));
    });
  }

  async #onAddCondition(event) {
    event.stopPropagation();
    const id = event.target.value;
    event.target.value = "";
    if ( id ) await this.actor.toggleStatusEffect(id, { active: true });
  }

  async #onAddItem(event) {
    event.stopPropagation();
    const type = event.target.value;
    event.target.value = "";
    if ( type ) await this.#createItemOfType(type);
  }

  async #createItemOfType(type) {
    const name = game.i18n.format("ROP.SHEET.NewItem", { type: game.i18n.localize(`TYPES.Item.${type}`) });
    await Item.implementation.create({ name, type }, { parent: this.actor });
  }

  async #onChangeConditionRating(event) {
    const id = event.target.closest("[data-condition-id]")?.dataset.conditionId;
    const effect = this.actor.effects.find(e => e.statuses.has(id));
    await effect?.update({ "system.level": Number(event.target.value) || 1 });
  }

  static async #createItem(event, target) {
    await this.#createItemOfType(target.dataset.type);
  }

  static async #deleteItem(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    await item?.deleteDialog({ sheet: this });
  }

  static async #editItem(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    item?.sheet.render(true);
  }

  static async #toggleCondition(event, target) {
    const id = target.closest("[data-condition-id]")?.dataset.conditionId;
    await this.actor.toggleStatusEffect(id, { active: target.checked });
  }

  static async #removeCondition(event, target) {
    const id = target.closest("[data-condition-id]")?.dataset.conditionId;
    if ( id ) await this.actor.toggleStatusEffect(id, { active: false });
  }
}
