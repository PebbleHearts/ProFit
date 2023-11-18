import {Model} from '@nozbe/watermelondb';
import {text} from '@nozbe/watermelondb/decorators';
import {Associations} from '@nozbe/watermelondb/Model';

export interface CategoryRecord extends Model {
  name: string;
}

export default class Category extends Model implements CategoryRecord {
  static table = 'categories';
  static associations: Associations = {
    exercises: {
      type: 'has_many',
      foreignKey: 'category_id',
    },
  };

  @text('name') name!: string;
}
