import ItemDataModel from "../abstract/item-data-model.mjs";
import rankedFeatureFields from "./templates/ranked-feature.mjs";

const { HTMLField } = foundry.data.fields;

/**
 * Kin (ancestry). Shares rankedFeatureFields() with Class — ranking a kin works like ranking
 * a class. A kin without talents simply leaves rank unused.
 */
export default class KinData extends ItemDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.KIN"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      ...rankedFeatureFields(),
      description: new HTMLField()
    };
  }
}
