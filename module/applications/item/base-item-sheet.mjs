const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

const TextEditor = foundry.applications.ux.TextEditor.implementation;

/**
 * Shared behavior for the 9 Item type sheets: enriched description HTML (every Item type has a
 * description field). Deleting an Item happens from the owning Actor's inventory list
 * (BaseActorSheet#deleteItem), not from inside the Item's own sheet.
 */
export default class BaseItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["rop", "item"],
    position: { width: 480, height: "auto" },
    form: { submitOnChange: true }
  };

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.item = this.item;
    context.system = this.item.system;
    if ( "description" in this.item.system ) {
      context.enrichedDescription = await TextEditor.enrichHTML(this.item.system.description, {
        relativeTo: this.item, secrets: this.item.isOwner
      });
    }
    return context;
  }
}
