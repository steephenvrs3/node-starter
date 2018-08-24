import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { ProjectRequest } from '../../models/ProjectRequest';

export const saveProjectDraft: RequestHandler = async (req, res, next) => {
  try {
    const exist = await ProjectRequest.count({
      userId: res.locals.user.userId,
      projectId: req.body.projectId,
    }).exec();
    if (exist) {
      return next(
        new RequestError(
          RequestErrorType.CONFLICT,
          'Project Already Existing !!',
        ),
      );
    } else {
      const newData: any = new ProjectRequest(req.body);
      await newData.save();
    }
    return res.status(201).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};