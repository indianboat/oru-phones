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
    educations:[
      {
        university:String,
        city:String,
        state:String,
        batch:String,
        degreeName:String,
        desc:String
      }
    ],
    experiences:[
      {
        from:Date,
        end:Date,
        companyName:String,
        designation:String,
        workType:{type:String, default:"full_time"}
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
        connectionName:String,
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
