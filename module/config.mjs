const ROP = {};

ROP.abilities = {
  agility: { label: "ROP.Ability.Agility" },
  charisma: { label: "ROP.Ability.Charisma" },
  intellect: { label: "ROP.Ability.Intellect" },
  perception: { label: "ROP.Ability.Perception" },
  strength: { label: "ROP.Ability.Strength" }
};

// appliesTo drives sheet-side filtering only — the SetField schema itself still accepts any key.
ROP.itemProperties = {
  strong: { label: "ROP.ItemProperty.Strong", appliesTo: ["weapon"] },
  agile: { label: "ROP.ItemProperty.Agile", appliesTo: ["weapon"] },
  versatile: { label: "ROP.ItemProperty.Versatile", appliesTo: ["weapon"] },
  aimed: { label: "ROP.ItemProperty.Aimed", appliesTo: ["weapon"] },
  throw: { label: "ROP.ItemProperty.Throw", appliesTo: ["weapon"] },
  offhand: { label: "ROP.ItemProperty.Offhand", appliesTo: ["weapon"] },
  reload: { label: "ROP.ItemProperty.Reload", appliesTo: ["weapon"] },
  conceal: { label: "ROP.ItemProperty.Conceal", appliesTo: ["weapon"] },
  mounted: { label: "ROP.ItemProperty.Mounted", appliesTo: ["weapon"] },
  reach: { label: "ROP.ItemProperty.Reach", appliesTo: ["weapon"] },
  clumsy: { label: "ROP.ItemProperty.Clumsy", appliesTo: ["armor"] },
  flammable: { label: "ROP.ItemProperty.Flammable", appliesTo: ["armor"] }
};

ROP.magicTraditions = {
  arcane: { ability: "intellect", label: "ROP.MagicTradition.Arcane" },
  holy: { ability: "charisma", label: "ROP.MagicTradition.Holy" },
  spirit: { ability: "perception", label: "ROP.MagicTradition.Spirit" }
};

// Equip slots shared by Armor and Gear.
ROP.equipSlots = {
  armor: { label: "ROP.EquipSlot.Armor" },
  head: { label: "ROP.EquipSlot.Head" },
  back: { label: "ROP.EquipSlot.Back" },
  belt: { label: "ROP.EquipSlot.Belt" },
  feet: { label: "ROP.EquipSlot.Feet" },
  hands: { label: "ROP.EquipSlot.Hands" },
  clothes: { label: "ROP.EquipSlot.Clothes" }
};

// Weapon.damage.type choices.
ROP.damageTypes = {
  hack: { label: "ROP.DamageType.Hack" },
  slash: { label: "ROP.DamageType.Slash" },
  bash: { label: "ROP.DamageType.Bash" },
  pierce: { label: "ROP.DamageType.Pierce" },
  pummel: { label: "ROP.DamageType.Pummel" }
};

// Weapon.range choices.
ROP.weaponRanges = {
  close: { label: "ROP.WeaponRange.Close" },
  near: { label: "ROP.WeaponRange.Near" },
  far: { label: "ROP.WeaponRange.Far" },
  distant: { label: "ROP.WeaponRange.Distant" }
};

// Weapon.handedness choices.
ROP.handedness = {
  "1h": { label: "ROP.Handedness.OneHanded" },
  "2h": { label: "ROP.Handedness.TwoHanded" }
};

// Empty by default — deities are defined by the GM or by a content module.
ROP.deities = {};

// Suggested follower jobs (not a closed list). Object form to match the other CONFIG.ROP lists.
ROP.hirelingJobs = {
  acolyte: { label: "ROP.HirelingJob.Acolyte" },
  adept: { label: "ROP.HirelingJob.Adept" },
  minstrel: { label: "ROP.HirelingJob.Minstrel" },
  rogue: { label: "ROP.HirelingJob.Rogue" },
  sage: { label: "ROP.HirelingJob.Sage" },
  servant: { label: "ROP.HirelingJob.Servant" },
  scout: { label: "ROP.HirelingJob.Scout" },
  warrior: { label: "ROP.HirelingJob.Warrior" }
};

// Placeholder icon (Foundry core) shared by all conditions until the system has its own icons.
const CONDITION_ICON = "icons/svg/aura.svg";

ROP.conditionTypes = {
  blinded: { label: "ROP.Condition.Blinded", hasRating: true, img: CONDITION_ICON },
  clumsy: { label: "ROP.Condition.Clumsy", hasRating: false, img: CONDITION_ICON },
  dead: { label: "ROP.Condition.Dead", hasRating: false, img: CONDITION_ICON },
  deafened: { label: "ROP.Condition.Deafened", hasRating: true, img: CONDITION_ICON },
  diseased: { label: "ROP.Condition.Diseased", hasRating: true, img: CONDITION_ICON },
  dying: { label: "ROP.Condition.Dying", hasRating: false, img: CONDITION_ICON },
  encumbered: { label: "ROP.Condition.Encumbered", hasRating: true, img: CONDITION_ICON },
  exhausted: { label: "ROP.Condition.Exhausted", hasRating: false, img: CONDITION_ICON },
  hungry: { label: "ROP.Condition.Hungry", hasRating: false, img: CONDITION_ICON },
  panicked: { label: "ROP.Condition.Panicked", hasRating: true, img: CONDITION_ICON },
  poisoned: { label: "ROP.Condition.Poisoned", hasRating: true, img: CONDITION_ICON },
  sleepDeprived: { label: "ROP.Condition.SleepDeprived", hasRating: false, img: CONDITION_ICON },
  sleepy: { label: "ROP.Condition.Sleepy", hasRating: false, img: CONDITION_ICON },
  starving: { label: "ROP.Condition.Starving", hasRating: false, img: CONDITION_ICON },
  stranded: { label: "ROP.Condition.Stranded", hasRating: false, img: CONDITION_ICON },
  stunned: { label: "ROP.Condition.Stunned", hasRating: true, img: CONDITION_ICON },
  thirsty: { label: "ROP.Condition.Thirsty", hasRating: true, img: CONDITION_ICON },
  unconscious: { label: "ROP.Condition.Unconscious", hasRating: false, img: CONDITION_ICON },
  unsteady: { label: "ROP.Condition.Unsteady", hasRating: true, img: CONDITION_ICON },
  upset: { label: "ROP.Condition.Upset", hasRating: true, img: CONDITION_ICON },
  winded: { label: "ROP.Condition.Winded", hasRating: false, img: CONDITION_ICON },
  wounded: { label: "ROP.Condition.Wounded", hasRating: false, img: CONDITION_ICON }
};

export default ROP;
