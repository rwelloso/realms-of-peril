import ItemDataModel from "../abstract/item-data-model.mjs";
import rankedFeatureFields from "./templates/ranked-feature.mjs";

const { HTMLField } = foundry.data.fields;

/**
 * A character class, advanced by assigning ranks to it. Carries no hit-point data: PC HP is a
 * flat 10 + Strength + Level, independent of class (see PCData#prepareDerivedData).
 */
export default class ClassData extends ItemDataModel {
  static LOCALIZATION_PREFIXES = ["ROP.CLASS"];

  /** @inheritDoc */
  static defineSchema() {
    return {
      ...rankedFeatureFields(),
      description: new HTMLField()
    };
  }
}
