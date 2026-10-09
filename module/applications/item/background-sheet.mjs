import BaseItemSheet from "./base-item-sheet.mjs";

export default class BackgroundSheet extends BaseItemSheet {
  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/item/background-sheet.hbs", scrollable: [""] }
  };
}
