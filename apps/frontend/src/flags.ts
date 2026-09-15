export const FEATURE_FLAGS = ['boosts-v1'] as const;

export type FeatureFlagKey = (typeof FEATURE_FLAGS)[number];
export type FeatureFlags = Record<FeatureFlagKey, boolean>;
