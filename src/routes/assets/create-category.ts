import { RequestHandler } from 'express';
import { AssetCategory } from '../../models/AssetCategory';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const createAssetCategory: RequestHandler = async (req, res, next) => {
  try {
    const cat = new AssetCategory(req.body);

    await cat.save();

    return res.status(201).send({
      status: 'success',
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};