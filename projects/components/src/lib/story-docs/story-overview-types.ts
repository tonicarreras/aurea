export interface StoryOverviewSource {
  intro: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  anatomy: { region: string; detail: string }[];
  accessibility: string[];
  keyboard?: string[];
  extra?: string;
}
