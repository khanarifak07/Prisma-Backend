import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  register,
  updateUserDetails,
} from "../controllers/user.controller.js";
const router = Router();

router.route("/register").post(register);
router.route("/updateUser/:id").put(updateUserDetails);
router.route("/getAllUsers").post(getAllUsers);
router.route("/deleteUser/:id").delete(deleteUser);

export default router;
