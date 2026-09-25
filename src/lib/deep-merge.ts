/** Deep-merge `patch` over `base` (objects only; arrays and scalars replace). */
export function deepMerge<T extends Record<string, unknown>>(base: T, patch: Partial<T>): T {
  const out = { ...base } as T;
  for (const [key, value] of Object.entries(patch)) {
    const k = key as keyof T;
    const baseValue = base[k];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue)
    ) {
      out[k] = deepMerge(
        baseValue as Record<string, unknown>,
        value as Record<string, unknown>,
      ) as T[typeof k];
    } else if (value !== undefined) {
      out[k] = value as T[typeof k];
    }
  }
  return out;
}
