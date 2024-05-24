import { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlag } from './setGetFeatures'

interface ToggleFeatureOptions<T> {
    name: keyof FeatureFlags
    on: () => T
    off: () => T
}

export const toggleFeature = <T>({ name, on, off }: ToggleFeatureOptions<T>): T => {
    const flag = getFeatureFlag(name)

    if (flag) return on()

    return off()
}
