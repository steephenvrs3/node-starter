import * as Joi from 'joi';
import { RequestHandler } from 'express';

const objectSchema = Joi.object({
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  skillTitle: Joi.string().required(),
  proficiency: Joi.string().required(),
  cluster: Joi.string().required(),
  description: Joi.string().when('cluster', {
    is: 'Functional',
    then: Joi.required(),
  }),
  certificates: Joi.string().when('cluster', {
    is: 'Functional',
    then: Joi.required(),
  }),
  lastApplied: Joi.number().when('cluster', {
    is: 'Functional',
    then: Joi.required(),
  }),
}).required();

// tslint:disable:variable-name
const SkillSchema = Joi.object().keys({
  skills: Joi.array()
    .items(objectSchema)
    .min(1)
    .required(),
});

export const skillValidation: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, SkillSchema, { allowUnknown: true }, (err: any) => {
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};
