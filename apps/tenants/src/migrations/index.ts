import * as migration_20260317_092953 from './20260317_092953';
import * as migration_20260318_112508_add_semantic_search from './20260318_112508_add_semantic_search';

export const migrations = [
  {
    up: migration_20260317_092953.up,
    down: migration_20260317_092953.down,
    name: '20260317_092953',
  },
  {
    up: migration_20260318_112508_add_semantic_search.up,
    down: migration_20260318_112508_add_semantic_search.down,
    name: '20260318_112508_add_semantic_search'
  },
];
