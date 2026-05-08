export default {
  interactive: true,
  exclude: [
    'typescript',
    'pnpm',
  ],
  force: true,
  write: true,
  ignoreOtherWorkspaces: true,
  depFields: {
    overrides: false,
  },
}
