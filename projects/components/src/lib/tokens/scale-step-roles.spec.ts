import {
  AUREA_SCALE_STEP_GROUPS,
  AUREA_SCALE_STEPS,
  aureaScaleStepGroup,
  aureaScaleStepTooltip,
} from './scale-step-roles';

describe('scale-step-roles', () => {
  it('covers steps 1–12 in five Radix-style groups', () => {
    const steps = AUREA_SCALE_STEP_GROUPS.flatMap((g) => g.steps);
    expect(steps).toEqual([...AUREA_SCALE_STEPS]);
  });

  it('maps step 9 to solid colors', () => {
    expect(aureaScaleStepGroup(9)?.id).toBe('solid');
    expect(aureaScaleStepTooltip(9)).toContain('Solid background');
  });

  it('maps step 1 to backgrounds', () => {
    expect(aureaScaleStepGroup(1)?.title).toBe('Backgrounds');
  });
});
