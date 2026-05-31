import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

export type AuAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AuAvatarShape = 'circle' | 'square';

/**
 * User avatar with image or initials fallback.
 *
 * @remarks
 * - **Image:** set `src` and `alt` (required when `src` is set).
 * - **Initials:** set `name` when there is no image; derived from first and last word.
 * - **Sizes:** xs–xl; `circle` (default, fully round) or `square` (rounded corners).
 */
@Component({
  selector: 'au-avatar',
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'au-avatar',
    '[attr.data-au-size]': 'size()',
    '[attr.data-au-shape]': 'shape()',
    '[attr.role]': 'hostRole()',
    '[attr.aria-label]': 'hostAriaLabel()',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
  },
})
export class AuAvatar {
  readonly src = input<string>('');
  readonly alt = input<string>('');
  readonly name = input<string>('');
  readonly size = input<AuAvatarSize>('md');
  readonly shape = input<AuAvatarShape>('circle');
  /** Hide from the accessibility tree when a parent provides the name (e.g. list row). */
  readonly decorative = input(false);

  private readonly imageFailed = signal(false);

  readonly showImage = computed(() => {
    const url = this.src().trim();
    return url.length > 0 && !this.imageFailed();
  });

  readonly initials = computed(() => deriveInitials(this.name()));

  readonly hostRole = computed(() => (this.showImage() ? null : 'img'));

  readonly hostAriaLabel = computed(() => {
    if (this.decorative() || this.showImage()) {
      return null;
    }
    const label = this.name().trim() || this.initials();
    return label;
  });

  protected onImageError(): void {
    this.imageFailed.set(true);
  }
}

function deriveInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return '?';
  }
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const last = parts[parts.length - 1];
    return `${parts[0].charAt(0)}${last.charAt(0)}`.toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}
