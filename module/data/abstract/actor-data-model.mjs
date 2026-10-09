/**
 * Common parent of every Actor sub-type data model. Each subclass builds its full schema in
 * defineSchema(), spreading in shared field groups from ../actor/templates/ as needed.
 */
export default class ActorDataModel extends foundry.abstract.TypeDataModel {}
