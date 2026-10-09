import BaseItemSheet from "./base-item-sheet.mjs";

export default class ContainerSheet extends BaseItemSheet {
  /** @override */
  static PARTS = {
    form: { template: "systems/rop/templates/item/container-sheet.hbs", scrollable: [""] }
  };
}
