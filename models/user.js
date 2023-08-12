import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
    about:String,
    skills:[{type:String}],
    education:[
      {
        college:String,
        city:String,
        batch:String,
        degreeName:String,
        desc:String
      }
    ],
    experience:[
      {
        from:Date,
        to:Date,
        company:String,
        designation:String,
        workType:String
      }
    ],
    certificat:[
      {
        courseName:String,
        companyName:String,
        duration:Number
      }
    ],
    professionalDetail:String,
    img:String,
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
