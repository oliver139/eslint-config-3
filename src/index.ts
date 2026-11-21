import { antfuOptions } from './antfuOptions'
import { oli } from './oliRules'

export * from './antfuOptions'
export * from './oliRules'

/**
 * @deprecated Use {@link antfuOptions} instead.
 */
export const options = antfuOptions

export default { antfuOptions, oli }
