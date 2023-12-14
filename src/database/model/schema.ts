import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'categories',
      columns: [{name: 'name', type: 'string'}],
    }),
    tableSchema({
      name: 'exercises',
      columns: [
        {name: 'category_id', type: 'string'},
        {name: 'name', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'workouts',
      columns: [
        {name: 'date', type: 'string'},
        {name: 'exercise_id', type: 'string'},
        {name: 'records', type: 'string'},
        {name: 'info', type: 'string', isOptional: true},
        {name: 'order', type: 'number'},
      ],
    }),
  ],
});
