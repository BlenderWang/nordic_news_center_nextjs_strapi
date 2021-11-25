'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */
 const _ = require("lodash");
 const path = require('path');
 //https://stackoverflow.com/questions/66494307/strapi-upload-plugin-how-to-place-a-file-generated-from-strapi-backend-js-code

/**
* Upload and attach file, upload_file_morph
* @param {string} filePath - target file path ex assets/logo.svg
* @param {string} targetId - database row id
* @param {string} targetType - database table type ex: categories
* @param {string} targetField - upload_file_morph ex: avatar
*/
 const uploadFileAsset = async (filePath, targetId, targetType, targetField) => {
  const mime = require('mime-types'); //used to detect file's mime type
  const fs = require('fs');
  const rootDir = process.cwd();
  //const filePath = `${rootDir}/${}`
  const stats = fs.statSync(`${rootDir}/${filePath}`);
  const fileName = path.parse(filePath).base;

  await strapi.plugins.upload.services.upload.upload({
    //data:{}, //mandatory declare the data(can be empty), otherwise it will give you an undefined error.
    data: {
      refId: targetId, //row id
      ref: targetType, //categories
      field: targetField //avatar
    },
    files: {
		path: filePath,
		name: fileName,
		type: mime.lookup(filePath), // mime type of the file
		size: stats.size,
	},
});
 }

 /**
  * bootstrapCategores, insert default categories
  */
 const bootstrapCategories = async () => {
   console.log("bootstrap default categories");
   const fs = require('fs');
   const rootDir = process.cwd();
   let raw = fs.readFileSync(`${rootDir}/config/data/defaultCategories.json`);
   let data = JSON.parse(raw);
  data.forEach(cate => {
    createCategory(cate.category, cate.file);
  });
 };

 /**
 * Insert category
 * @param {object} cat - category object { name: "", slug: "" }
 * @param {object} file - file object { path: "assets/box.svg" }
 */
 const createCategory = async (cat, file) => {
  const res = await strapi.query("categories").findOne({slug: cat.slug});
  if(res == null) {
    const result = await strapi.query("categories").create({
      name: cat.name,
      slug: cat.slug
    });
    if(result) {
      uploadFileAsset(file.path, result.id, "categories", "avatar");
    }
    return result;
  }
 };

module.exports = async () => {
  const service = await strapi.plugins["users-permissions"].services.userspermissions;
  const plugins = await service.getPlugins("en");

  /** @type Role[] */
    const roles = await service.getRoles();

  const getRole = async (type) => {
    const {id} = _.find(roles, x => x.type === type);
    return service.getRole(id, plugins);
  }

  const setPermission = (role, type, controller, action, enabled) => {
    try {
      role.permissions[type].controllers[controller][action].enabled = enabled;
    }
    catch (e) {
      console.error(`Couldn't set permission ${role.name} ${type}:${controller}:${action}:${enabled}`);
    }
  }

  const publicRole = await getRole("public");
  setPermission(publicRole, "application", "comment", "count", true);
  setPermission(publicRole, "application", "comment", "find", true);
  setPermission(publicRole, "application", "comment", "findone", true);
  setPermission(publicRole, "application", "post", "count", true);
  setPermission(publicRole, "application", "post", "find", true);
  setPermission(publicRole, "application", "post", "findone", true);
  setPermission(publicRole, "application", "categories", "count", true);
  setPermission(publicRole, "application", "categories", "find", true);
  setPermission(publicRole, "application", "categories", "findone", true);
  await service.updateRole(publicRole.id, publicRole);
  await bootstrapCategories();
};


