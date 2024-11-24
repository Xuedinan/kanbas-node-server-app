import db from "../Database/index.js";
import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  // delete module
  app.delete("/api/modules/:mid", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
  });

  // get all modules
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = db.modules.filter((m) => m.course === cid);
    res.json(modules);
  });

  // create new module
  app.post("/api/courses/:cid/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });

  // update module
  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  });
}
