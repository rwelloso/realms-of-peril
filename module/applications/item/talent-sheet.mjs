import BaseItemSheet from "./base-item-sheet.mjs";

export default class TalentSheet extends BaseItemSheet {
  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/item/talent-sheet.hbs", scrollable: [""] }
  };
}
