import Database from "../Database/index.js";

export function findAllCourses() {
  return Database.courses;
}
