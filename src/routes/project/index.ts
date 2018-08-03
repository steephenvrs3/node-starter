import * as express from 'express';

import { projectRequestRule } from './validators/project-request-rules';
import { saveProjectRule } from './validators/save-project-rules';
import { getProjSubCategoryRules } from './validators/get-proj-category-rules';
import { saveProjectCategoryRules } from './validators/add-project-category-rules';
import { updateProjectCategoryRules } from './validators/add-project-category-rules';
import { deleteProjectCategoryRules } from './validators/delete-project-category-rule';
import { createCategoryValidationChain } from './validators/save-proj-category-rule';
import { createSubCatValidationChain } from './validators/save-proj-sub-category-rules';
import { saveFavoriteRule } from '../favorites/validators/add-favorites-rules';

import { saveProjectRequest } from './project-request';
import { saveProject } from './save-project';
import { getProjectCategory } from './get-project-category';
import { getProjSubCategory } from './get-project-category';
import { saveProjectCategory } from './add-category';
import { updateProjectCategory } from './add-category';
import { listProjectCategories } from './list-category';
import { deleteCategory } from './delete-category';
import { getProjects } from './get-project-catalog-details';
import { searchProjects } from './search-project-catalog';
import { createProjectCategory } from './save-proj-category';
import { createProjectSubCategory } from './save-proj-sub-category';
import { saveFavorites } from '../favorites/add-delete-favorites';
import { deleteFavorites } from '../favorites/add-delete-favorites';
import { searchCatalog } from '../project/list-project-catalog';
import { filterProject } from '../project/filter-projects';
import { getProjectById } from '../project/delete-view-project';
import { deleteProjectById } from '../project/delete-view-project';
import { updateProject } from '../project/save-project';

export const project = express.Router();

project.get('/delete-project', deleteProjectById);
project.get('/view-project', getProjectById);
project.post('/update-project', updateProject);
project.post('/filter-project', filterProject);
project.post('/save-project-request', projectRequestRule, saveProjectRequest);
project.get('/get-catalog', searchCatalog);
project.post('/save-project-favorite', saveFavoriteRule, saveFavorites);
project.post('/delete-project-favorite', deleteFavorites);
project.post('/save-project', saveProjectRule, saveProject);
project.post('/search-project', searchProjects);
project.get('/get-project-category', getProjectCategory);
project.get('/get-project-catalog', getProjects);
project.get(
  '/get-proj-sub-category',
  getProjSubCategoryRules,
  getProjSubCategory,
);

project.post(
  '/save-project-category',
  saveProjectCategoryRules,
  saveProjectCategory,
);

project.post(
  '/update-project-category',
  updateProjectCategoryRules,
  updateProjectCategory,
);

project.post(
  '/save-single-category',
  createCategoryValidationChain,
  createProjectCategory,
);

project.post(
  '/save-single-sub-category',
  createSubCatValidationChain,
  createProjectSubCategory,
);

project.get('/list-all-categories', listProjectCategories);

project.post('/delete-category', deleteProjectCategoryRules, deleteCategory);
