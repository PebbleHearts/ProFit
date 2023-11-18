import {Model} from '@nozbe/watermelondb';
import {Associations} from '@nozbe/watermelondb/Model';
import {text, relation} from '@nozbe/watermelondb/decorators';

export interface ExerciseRecord extends Model {
  name: string;
  category: string;
}

export default class Exercise extends Model {
  static table = 'exercises';
  static associations: Associations = {
    categories: {
      type: 'belongs_to',
      key: 'category_id',
    },
    workouts: {
      type: 'has_many',
      foreignKey: 'exercise_id',
    },
  };

  @text('name') name!: string;
  @relation('categories', 'category_id') category!: string;
}
