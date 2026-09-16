export const FEATURE_FLAGS = [
	'boosts-v1',
	'enable-sign-up',
	'show-sidebar-settings',
	'show-sidebar-profile'
] as const;

export type FeatureFlagKey = (typeof FEATURE_FLAGS)[number];
export type FeatureFlags = Record<FeatureFlagKey, boolean>;
