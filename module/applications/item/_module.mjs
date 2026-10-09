import WeaponSheet from "./weapon-sheet.mjs";
import ArmorSheet from "./armor-sheet.mjs";
import GearSheet from "./gear-sheet.mjs";
import ContainerSheet from "./container-sheet.mjs";
import ClassSheet from "./class-sheet.mjs";
import KinSheet from "./kin-sheet.mjs";
import BackgroundSheet from "./background-sheet.mjs";
import TalentSheet from "./talent-sheet.mjs";
import PowerSheet from "./power-sheet.mjs";

export {
  WeaponSheet,
  ArmorSheet,
  GearSheet,
  ContainerSheet,
  ClassSheet,
  KinSheet,
  BackgroundSheet,
  TalentSheet,
  PowerSheet
};

export const config = {
  weapon: WeaponSheet,
  armor: ArmorSheet,
  gear: GearSheet,
  container: ContainerSheet,
  class: ClassSheet,
  kin: KinSheet,
  background: BackgroundSheet,
  talent: TalentSheet,
  power: PowerSheet
};
