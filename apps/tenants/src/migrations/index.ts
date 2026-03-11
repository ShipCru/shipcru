import * as migration_20260310_120147 from './20260310_120147';
import * as migration_20260311_112224 from './20260311_112224';

export const migrations = [
  {
    up: migration_20260310_120147.up,
    down: migration_20260310_120147.down,
    name: '20260310_120147',
  },
  {
    up: migration_20260311_112224.up,
    down: migration_20260311_112224.down,
    name: '20260311_112224'
  },
];
