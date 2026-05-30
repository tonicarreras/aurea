/** Minimal surface for coordinating a single open menu on the page. */
export interface AuMenuOpenController {
  close(): void;
}

let activeMenu: AuMenuOpenController | null = null;

/** Closes any other open menu and marks `menu` as the active one. */
export function claimOpenMenu(menu: AuMenuOpenController): void {
  if (activeMenu && activeMenu !== menu) {
    activeMenu.close();
  }
  activeMenu = menu;
}

/** Clears the active menu when it closes or is destroyed. */
export function releaseOpenMenu(menu: AuMenuOpenController): void {
  if (activeMenu === menu) {
    activeMenu = null;
  }
}

/** Test helper — resets global open state. */
export function resetOpenMenuForTests(): void {
  activeMenu = null;
}
