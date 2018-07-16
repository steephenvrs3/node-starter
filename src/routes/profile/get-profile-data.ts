import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { PersonalDetails } from '../../models/PersonalDetails';
// import { CustomerCredentials } from '../../models/CustomerCredentials';
import { Education } from '../../models/Education';
import { Experience } from '../../models/Experience';
import { EmployeeProjects } from '../../models/EmployeeProjects';
import { Goals } from '../../models/Goals';
import { Skills } from '../../models/Skills';
import { Wlb } from '../../models/WLB';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getLinkedData: RequestHandler = async (req, res, next) => {
  try {
    const comingUserId = req.query.userId
      ? req.query.userId
      : res.locals.user.userId;

    const personalDetailsDataPromise: any = PersonalDetails.findOne({
      userId: comingUserId,
    })
      .lean()
      .exec();
    const educationDataPromise = Education.find({
      userId: comingUserId,
    })
      .lean()
      .exec();
    const workExperienceDataPromise = Experience.find({
      userId: comingUserId,
    })
      .lean()
      .exec();
    const projectsDataPromise = EmployeeProjects.find({
      userId: comingUserId,
    })
      .lean()
      .exec();

    const goalDataPromise = Goals.find({
      userId: comingUserId,
    })
      .lean()
      .exec();
    const skillDataPromise = Skills.find({
      userId: comingUserId,
    })
      .lean()
      .exec();
    const wlbDataPromise = Wlb.find({
      userId: comingUserId,
    })
      .lean()
      .exec();

    const [
      personalDetailsData,
      educationData,
      workExperienceData,
      projectsData,
    ] = await BluePromise.all([
      personalDetailsDataPromise,
      educationDataPromise,
      workExperienceDataPromise,
      projectsDataPromise,
    ]);

    const [goalData, skillData, wlbData] = await BluePromise.all([
      goalDataPromise,
      skillDataPromise,
      wlbDataPromise,
    ]);

    let educationStatus = false;
    let experienceStatus = false;
    let goalStatus = false;
    let skillStatus = false;
    let wlbStatus = false;

    if (educationData.length > 0) {
      educationStatus = educationData[0].submitted;
    }

    if (workExperienceData.length > 0) {
      experienceStatus = educationData[0].submitted;
    }

    if (goalData.length > 0) {
      goalStatus = goalData[0].submitted;
    }

    if (skillData.length > 0) {
      skillStatus = skillData.submitted;
    }

    if (wlbData.length > 0) {
      wlbStatus = wlbData[0].submitted;
    }
    const submittedStatusObj = {
      personalDetails: personalDetailsData
        ? personalDetailsData.submitted
        : false,

      education: educationStatus,
      experience: experienceStatus,
      goal: goalStatus,
      skill: skillStatus,
      wlb: wlbStatus,
    };

    res.status(200).json({
      submittedStatus: submittedStatusObj,
      PersonalDetails: personalDetailsData,
      Education: educationData,
      WorkExperience: {
        experiences: workExperienceData,
        projects: projectsData,
      },
      // CustomerCredentials: customerCredentialsData,
      Goals: goalData,
      Skills: skillData,
      WLB: wlbData,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
