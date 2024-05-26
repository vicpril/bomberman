import { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlag } from './setGetFeatures'

interface ToggleFeatureOptions<T> {
    feature: keyof FeatureFlags
    on: () => T
    off: () => T
}

export const toggleFeature = <T>({ feature, on, off }: ToggleFeatureOptions<T>): T => {
    const flag = getFeatureFlag(feature)

    if (flag) return on()

    return off()
}
