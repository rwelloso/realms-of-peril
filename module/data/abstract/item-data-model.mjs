/**
 * Common parent of every Item sub-type data model. Each subclass builds its full schema in
 * defineSchema(), spreading in shared field groups from ../item/templates/ as needed.
 */
export default class ItemDataModel extends foundry.abstract.TypeDataModel {}
