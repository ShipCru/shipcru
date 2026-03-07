import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260304_130702 from './20260304_130702';
import * as migration_20260307_204014 from './20260307_204014';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260304_130702.up,
    down: migration_20260304_130702.down,
    name: '20260304_130702',
  },
  {
    up: migration_20260307_204014.up,
    down: migration_20260307_204014.down,
    name: '20260307_204014'
  },
];
