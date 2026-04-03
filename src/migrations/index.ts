import * as migration_20260331_103304 from './20260331_103304';
import * as migration_20260403_052505 from './20260403_052505';

export const migrations = [
  {
    up: migration_20260331_103304.up,
    down: migration_20260331_103304.down,
    name: '20260331_103304',
  },
  {
    up: migration_20260403_052505.up,
    down: migration_20260403_052505.down,
    name: '20260403_052505'
  },
];
