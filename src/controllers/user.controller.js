import prisma from "../db/db.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const register = asyncHandler(async (req, res) => {
  //get the detials (req.body)
  //validate the details
  //check used is already registered or not
  //create user
  //retrived the created user
  //return res
  const { username, email, password } = req.body;
  // Validate that required fields are not empty
  if ([username, email, password].some((fields) => fields == null)) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    throw new ApiError(
      400,
      "User is already registered with this username or email"
    );
  }
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  const createdUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      // Exclude the `password` field by not including it in the `select` option
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "user created successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany();

  return res
    .status(200)
    .json(new ApiResponse(200, allUsers, "All users fetched successfully"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      username,
      email,
      password,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, deletedUser, "user deleted successfully"));
});

export { deleteUser, getAllUsers, register, updateUserDetails };
