import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:String, // for session use
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
    about:String,
    skills:[{type:String}],
    education:[{
        university:String,
        city:String,
        state:String,
        batch:Date,
        degreeName:String,
      }
    ],
    experience:[{
        from:Number,
        end:Number,
        totalExperience:String,
        companyName:String,
        designation:String,
        workType:String
      }
    ],
    certificates:[
      {
        courseName:String,
        companyName:String,
        from:Date,
        end:Date
      }
    ],
    professionalDetail:String,
    imgUrl:String,
    connections:[
      {
        name:String,
        role:String,
        company:String
      }
    ]
  },
  { timestamps: true }
);


mongoose.models = {};
const User = mongoose.model("users", userSchema);

export default User;
