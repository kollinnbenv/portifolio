const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const getSafeExternalUrl = (value: unknown): string | null => {
  if (!isNonEmptyString(value)) return null;

  const trimmed = value.trim();

  if (!/^https?:\/\//i.test(trimmed)) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.toString();
  } catch {
    return null;
  }
};

export const getSafeMailtoUrl = (value: unknown): string | null => {
  if (!isNonEmptyString(value)) return null;

  const trimmed = value.trim();
  if (!trimmed.toLowerCase().startsWith('mailto:')) return null;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'mailto:' ? trimmed : null;
  } catch {
    return null;
  }
};
