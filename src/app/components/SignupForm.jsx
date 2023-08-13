import { useState } from 'react';
import { FieldArray, Form, Formik, Field } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';

const SignUpForm = () => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (push, skills) => {
    if (newSkill.trim() !== '') {
      push(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <Formik
      initialValues={{
        // ...other fields
        skills: [],
        // ...
      }}
      // ...
    >
      {({ values }) => (
        <Form className="p-8 space-y-4">
          {/* ...other fields */}
          <FieldArray name="skills">
            {({ push, remove }) => (
              <div className="space-y-2">
                <label>Skills</label>
                <div className="space-x-2">
                  {values.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        className="ml-2 text-xs text-white bg-red-500 rounded"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </motion.span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Enter skill"
                    className="w-24 p-2 border"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button
                    type="button"
                    className="px-2 py-1 text-sm text-white bg-blue-500 rounded"
                    onClick={() => handleAddSkill(push, values.skills)}
                  >
                    Add Skill
                  </button>
                </div>
              </div>
            )}
          </FieldArray>
          {/* ...other fields */}
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
