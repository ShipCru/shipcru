import * as migration_20260322_135733_init from './20260322_135733_init';
import * as migration_20260325_135055_better_auth from './20260325_135055_better_auth';

export const migrations = [
  {
    up: migration_20260322_135733_init.up,
    down: migration_20260322_135733_init.down,
    name: '20260322_135733_init',
  },
  {
    up: migration_20260325_135055_better_auth.up,
    down: migration_20260325_135055_better_auth.down,
    name: '20260325_135055_better_auth'
  },
];
