import * as Joi from 'joi';
import { RequestHandler } from 'express';

const objectSchema = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  typeOfInstitution: Joi.string().required(),
  nameOfInstitution: Joi.string().required(),
  locationCountry: Joi.string().required(),
  locationCity: Joi.string().required(),
  major: Joi.string().required(),
  degree: Joi.string().required(),
  grade: Joi.string().required(),
  mainSubjects: Joi.string().required(),
  gradeOfMainSubjects: Joi.string().required(),
  activities: Joi.string().required(),
}).required();
// tslint:disable-next-line
const EducationSchema = Joi.object().keys({
  skills: Joi.array()
    .items(objectSchema)
    .min(1)
    .required(),
});

export const educationValidation: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    EducationSchema,
    { stripUnknown: true },
    (err: any) => {
      if (err) {
        return res.status(422).send({
          success: false,
          msg: err,
        });
      }
      req.body.createdAt = new Date();
      next();
    },
  );
};
