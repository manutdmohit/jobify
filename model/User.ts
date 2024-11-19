import mongoose, { Schema, Document } from 'mongoose';

export interface teachingSkills {
  classroomManagement: boolean;
  lessonPlanning: boolean;
  curriculumDevelopment: boolean;
  assessmentTechniques: boolean;
  otherTeachingSkills: string;
}

export interface culturalKnowledge {
  knowledgeOfSpecifiCulturesOrTraditions?: boolean;
  abilityToTeachCulturalValuesAndPerspectives?: boolean;
  fluencyInLanguages?: boolean;
  languageDetails?: string;
  otherCulturalKnowledge?: string;
}

export interface interPersonalSkills {
  communicationSkills: boolean;
  empathy: boolean;
  patience: boolean;
  culturalSensitivity: boolean;
  otherInterpersonalSkills: string;
}

export interface references {
  name: string;
  title: string;
  organization: string;
  contactInfo: string;
}

export interface certifications {
  certificationName: string;
  certifyingOrganization: string;
  yearOfCertification: string;
}

export interface User extends Document {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  is_verified: boolean;
  jobPreference: string;
  degree: string;
  ppPhoto: string;
  identityPhoto: string;
  institution: string;
  yearOfGraduation: string;
  teachingSkills: teachingSkills;
  culturalKnowledge: culturalKnowledge;
  interPersonalSkills: interPersonalSkills;
  references: references;
  certifications: certifications[];
  statementOfPurpose: string;
}

const UserSchema: Schema<User> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please use a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone Number is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    jobPreference: {
      type: String,
      required: [true, 'Job Preference is required'],
    },
    degree: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    yearOfGraduation: {
      type: String,
      required: true,
    },
    teachingSkills: {
      classroomManagement: {
        type: Boolean,
        required: true,
      },
      lessonPlanning: {
        type: Boolean,
        required: true,
      },
      curriculumDevelopment: {
        type: Boolean,
        required: true,
      },
      assessmentTechniques: {
        type: Boolean,
        required: true,
      },
      otherTeachingSkills: {
        type: String,
        required: false,
      },
    },
    culturalKnowledge: {
      knowledgeOfSpecifiCulturesOrTraditions: {
        type: Boolean,
        required: false,
      },
      abilityToTeachCulturalValuesAndPerspectives: {
        type: Boolean,
      },
      fluencyInLanguages: {
        type: Boolean,
      },
      languageDetails: {
        type: String,
        required: false,
      },
      otherCulturalKnowledge: {
        type: String,
        required: false,
      },
    },
    interPersonalSkills: {
      communicationSkills: {
        type: Boolean,
        required: true,
      },
      empathy: {
        type: Boolean,
        required: true,
      },
      patience: {
        type: Boolean,
        required: true,
      },
      culturalSensitivity: {
        type: Boolean,
        required: true,
      },
      otherInterpersonalSkills: {
        type: String,
        required: false,
      },
    },
    references: [
      {
        name: {
          type: String,
          required: false,
        },
        title: {
          type: String,
          required: false,
        },
        organization: {
          type: String,
          required: true,
        },
        contactInfo: {
          type: String,
          required: true,
        },
      },
    ],
    certifications: [
      {
        certificationName: {
          type: String,
          required: false,
        },
        certifyingOrganization: {
          type: String,
          required: true,
        },
        yearOfCertification: {
          type: String,
          required: true,
        },
      },
    ],
    statementOfPurpose: {
      type: String,
      required: [true, 'Statement of Purpose is required'],
      minlength: [50, 'Please provide a brief statement'],
    },
  },
  {
    timestamps: true,
  }
);

const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model('User', UserSchema);

export default User;
