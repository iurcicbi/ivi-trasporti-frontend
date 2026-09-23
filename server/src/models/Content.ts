import mongoose, { Document, Schema } from 'mongoose';

export interface IContent {
  key: string;
  value: any;
  section: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'list' | 'object';
  createdAt: Date;
  updatedAt: Date;
}

export interface IContentDocument extends IContent, Document {}

const contentSchema = new Schema<IContentDocument>(
  {
    key: {
      type: String,
      required: [true, 'Key è obbligatoria'],
      unique: true,
      trim: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: [true, 'Value è obbligatorio'],
    },
    section: {
      type: String,
      required: [true, 'Section è obbligatoria'],
      enum: ['globale', 'home', 'servizi', 'chi-siamo', 'contatti'],
    },
    label: {
      type: String,
      required: [true, 'Label è obbligatoria'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['text', 'textarea', 'image', 'list', 'object'],
      default: 'text',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IContentDocument>('Content', contentSchema);
