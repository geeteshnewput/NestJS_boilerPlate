import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../models/user.model';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop()
  task: string;

  @Prop()
  id: number;

  @Prop({type: Types.ObjectId, ref: 'User'})
  userId?: User;

  @Prop({default: Date.now})
  date: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);