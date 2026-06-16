import { describe, expect, it } from 'vitest';

import { isModalPanelOrFloatingOverlayClick, createModalDialogInteractionAllowPredicate } from './modal-backdrop-click';

describe('isModalPanelOrFloatingOverlayClick', () => {
  it('returns true for clicks inside the modal panel', () => {
    const panel = document.createElement('div');
    panel.className = 'au-dialog__panel';
    const button = document.createElement('button');
    panel.append(button);
    expect(isModalPanelOrFloatingOverlayClick(button, '.au-dialog__panel')).toBe(true);
  });

  it('returns true for clicks on portaled floating panels', () => {
    const calendar = document.createElement('div');
    calendar.className = 'au-date-calendar au-floating-panel';
    const day = document.createElement('button');
    calendar.append(day);
    expect(isModalPanelOrFloatingOverlayClick(day, '.au-dialog__panel')).toBe(true);
  });

  it('returns false for backdrop clicks', () => {
    const dialog = document.createElement('dialog');
    expect(isModalPanelOrFloatingOverlayClick(dialog, '.au-dialog__panel')).toBe(false);
  });

  it('returns false for non-element targets', () => {
    expect(isModalPanelOrFloatingOverlayClick(null, '.au-dialog__panel')).toBe(false);
    expect(isModalPanelOrFloatingOverlayClick(document.createTextNode('x'), '.au-dialog__panel')).toBe(
      false,
    );
  });

  it('createModalDialogInteractionAllowPredicate allows nodes inside the dialog', () => {
    const dialog = document.createElement('dialog');
    const panel = document.createElement('div');
    const button = document.createElement('button');
    panel.append(button);
    dialog.append(panel);
    const allow = createModalDialogInteractionAllowPredicate(() => dialog);
    expect(allow(button)).toBe(true);
    expect(allow(document.body)).toBe(false);
  });

  it('createModalDialogInteractionAllowPredicate rejects non-node targets', () => {
    const dialog = document.createElement('dialog');
    const allow = createModalDialogInteractionAllowPredicate(() => dialog);
    expect(allow(null)).toBe(false);
    expect(allow({} as unknown as EventTarget)).toBe(false);
  });
});
