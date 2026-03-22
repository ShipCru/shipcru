import * as migration_20260322_135733_init from './20260322_135733_init';

export const migrations = [
  {
    up: migration_20260322_135733_init.up,
    down: migration_20260322_135733_init.down,
    name: '20260322_135733_init'
  },
];
