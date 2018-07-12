import * as Joi from 'joi';
import { RequestHandler } from 'express';

// tslint:disable:variable-name
const wlbDataSchema = Joi.object().keys({
  annualAvailableCapacity: Joi.string().required(),
  capriconsAvailableCapacity: Joi.string().required(),
  frequencyOnsiteWork: Joi.string().required(),
  frequencyHomeOfficeWork: Joi.string().required(),
  location: Joi.array().required(),
  workpermit: Joi.string(),
});

export const saveWLBRule: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, wlbDataSchema, { stripUnknown: true }, err => {
    // console.log();
    if (err) {
      return res.status(422).send({
        success: false,
        msg: err,
      });
    }
    next();
  });
};