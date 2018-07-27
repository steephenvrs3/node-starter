import { RequestHandler } from 'express';
import { Industry } from '../../models/Industries';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const createIndustries: RequestHandler = async (req, res, next) => {
  try {
    const indus = new Industry(req.body);

    await indus.save();

    return res.status(201).send({
      status: 'success',
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};