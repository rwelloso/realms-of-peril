import BaseItemSheet from "./base-item-sheet.mjs";

export default class ClassSheet extends BaseItemSheet {
  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/item/class-sheet.hbs", scrollable: [""] }
  };
}
