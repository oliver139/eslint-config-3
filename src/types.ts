export type SeverityName = 'off' | 'warn' | 'error'
/**
 * The numeric severity level for a rule.
 *
 * - `0` means off.
 * - `1` means warn.
 * - `2` means error.
 */
export type SeverityLevel = 0 | 1 | 2
/**
 * The severity of a rule in a configuration.
 */
export type Severity = SeverityName | SeverityLevel
