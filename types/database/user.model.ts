import { Schema, models, model, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  password?: string;

  picture: string;

  position?: string;
  organization?: string;
  shortBio?: string;
  bio?: string;
  portfolioWebsite?: string;

  city?: string;
  country: {
    value: string;
    label: string;
  };

  role?: string;
  languages: Array<{
    value: string;
    label: string;
  }>;

  expertise?: Array<{
    value: string;
    label: string;
  }>;
  toolkit?: Array<{
    value: string;
    label: string;
  }>;
  industries?: Array<{
    value: string;
    label: string;
  }>;

  duration?: string;
  price?: string;

  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },

  picture: { type: String, required: true },

  position: { type: String },
  organization: { type: String },
  shortBio: { type: String },
  bio: { type: String },
  portfolioWebsite: { type: String },

  city: { type: String },
  country: { value: String, label: String },

  role: { type: String },
  languages: [{ value: String, label: String }],

  expertise: [{ value: String, label: String }],
  toolkit: [{ value: String, label: String }],
  industries: [{ value: String, label: String }],

  duration: { type: String },
  price: { type: String },

  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model('User', UserSchema);

export default User;
