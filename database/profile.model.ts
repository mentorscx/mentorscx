import { Schema, models, model, Document, now } from 'mongoose';

export interface IProfile extends Document {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  bio: string;
  timezone: { value: string; label: string };
  languages: { value: string; label: string }[];
  expertise: { value: string; label: string }[];
  toolkit: { value: string; label: string }[];
  twitterUrl: string;
  linkedinUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema({
  userId: String,
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  role: String,
  bio: String,
  timezone: { value: String, label: String },
  languages: [{ value: String, label: String }],
  expertise: [{ value: String, label: String }],
  toolkit: [{ value: String, label: String }],
  twitterUrl: String,
  linkedinUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile = models.Profile || model('Profile', ProfileSchema);

export default Profile;
