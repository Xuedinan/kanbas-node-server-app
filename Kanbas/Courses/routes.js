import Database from "../Database/index.js";
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  // automatically enroll the current user in the when create one
  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });

  // // create new courses
  // app.post("/api/courses", (req, res) => {
  //   const course = { ...req.body, _id: new Date().getTime().toString() };
  //   Database.courses.push(course);
  //   res.send(course);
  // });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
}
