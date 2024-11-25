import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.delete("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    await assignmentsDao.deleteAssignment(aid);
    res.sendStatus(200);
  });

  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    const newAssignment = await assignmentsDao.createAssignment(cid, req.body);
    res.send(newAssignment);
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    await assignmentsDao.updateAssignment(aid, req.body);
    res.sendStatus(204);
  });

  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    const assignments = await assignmentsDao.getAssignmentsByCourse(cid);
    res.json(assignments);
  });
}
