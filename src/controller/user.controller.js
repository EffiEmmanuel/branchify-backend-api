import UserModel from "../model/user.model";
import BranchModel from "../model/branch.model";
import { BranchService } from "../service/BranchService";
import UserService from "../service/UserService";

// Generic messages
const internalServerError =
  "An error occured while we processed your request. Please try again.";

// SERVICE INSTANCES
// Create a new UserService instance
const userService = new UserService(UserModel);
const branchService = new BranchService(BranchModel);

export const signupUser = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  try {
    // Create new user
    const user = await userService.signupUser({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    // Return a response
    return res
      .status(user.status)
      .json({ user: user?.user ?? null, message: user.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log in user
    const user = await userService.loginUser({
      email,
      password,
    });

    // Return a response
    return res
      .status(user.status)
      .json({ token: user?.token ?? null, message: user.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

export const createBranch = async (req, res) => {
  // Get branch name and description from request body
  const { branchName, description } = req.body;
  // Get user id from request query
  const { userId } = req.body;

  try {
    // Call create branch service here
    const newBranch = await branchService.createBranch(userId, {
      branchName,
      description,
    });

    // Return a response
    return res.status(newBranch.status).json({
      message: newBranch.message,
      branch: newBranch?.branch ?? null,
    });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};