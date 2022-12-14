import { Category } from "../model/Category.js";

const CategoryService = (function () {
  return {
    exists: async function (query) {
      return Category.exists(query);
    },
    insert: async function (document) {
      const category = new Category(document);
      await category.save();
      return category;
    },
    find: async function (query) {
      return Category.find(query);
    },
    findOne: async function (query) {
      return Category.findOne(query);
    },
    deleteOne: async function (query) {
      return Category.deleteOne(query);
    },
    update: async function (filter, updatedDoc) {
      return Category.updateOne(filter, updatedDoc);
    },
    deleteMany: async function (query) {
      return Category.deleteMany(query);
    },
  };
})();

export { CategoryService };
