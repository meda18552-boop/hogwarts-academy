import type { House, SpellCastEvent, AcademyEvent, WizardSummary, WizardUpdate } from "./types";
import type { WizardRepository, SpellRepository } from "./repository";
import { Log } from "./decorators";

export class AcademyService {
  constructor(
    private readonly wizards: WizardRepository,
    private readonly spells: SpellRepository
  ) {}

  @Log
  castSpell(wizardId: number, spellId: number): string {
    const wizard = this.wizards.findById(wizardId);
    const spell = this.spells.findById(spellId);
    if (!wizard || !spell) throw new Error("Wizard or spell not found");
    return `${wizard.name} casts ${spell.name}!`;
  }

  findByHouse(house: House): WizardSummary[] {
    return this.wizards
      .findByHouse(house)
      .map(({ id, name, house }) => ({ id, name, house }));
  }

  updateWizard(id: number, changes: WizardUpdate): boolean {
    return this.wizards.update(id, changes);
  }

  getSpellEvents(events: AcademyEvent[]): SpellCastEvent[] {
    return events.filter((event): event is SpellCastEvent => event.type === "spell-cast");
  }
}