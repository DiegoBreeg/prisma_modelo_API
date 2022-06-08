import { Router } from "express";
import userController from "./controllers/userController.js";
const router = Router();

router.get("/", (req, res) => res.status(200).sendFile('/home/dviego/dev/prisma_modelo/src/exemplo.html'))
router.post("/user", userController.createUser)
router.get("/users", userController.findAllUsers)
router.get("/user/:id", userController.findAUser)
router.put("/user/:id", userController.updateUser)
router.delete("/user/:id", userController.deleteUser)
export { router }