import BaseItemSheet from "./base-item-sheet.mjs";

export default class KinSheet extends BaseItemSheet {
  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/item/kin-sheet.hbs", scrollable: [""] }
  };
}
