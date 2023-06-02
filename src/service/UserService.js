import bcrypt from "bcryptjs";
import {
  checkUserEmailValidity,
  validateFields,
  checkUsernameValidity,
} from "../util/auth.helper";
import { sign } from "jsonwebtoken";

export default class UserService {
  constructor(BranchifyUserModel) {
    this.UserModel = BranchifyUserModel;
  }

  // This service creates a new user - Sign up service
  async signupUser(user) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([
      user.firstName,
      user.lastName,
      user.username,
      user.email,
      user.password,
    ]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if user is already signed up
    const userAlreadyExistsWithEmail = await checkUserEmailValidity(user.email);
    // Check if user is already signed up
    const userAlreadyExistsWithUsername = await checkUsernameValidity(
      user.username
    );

    // If user email already exists
    if (userAlreadyExistsWithEmail.status === 409)
      return userAlreadyExistsWithEmail;

    // If username already exists
    if (userAlreadyExistsWithEmail.status === 409)
      return userAlreadyExistsWithUsername;

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    // If the email is available, then proceed to sign up the user
    const newUser = await this.UserModel.create({
      password: hashedPassword,
      ...user,
    });
    return {
      status: 201,
      message: "Your account has been created successfully!",
      user: newUser,
    };
  }

  // This service logs in the user
  async loginUser(email, password) {
    console.log("USER EMAIL AND PASSWORD::", email, password);
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([email, password]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // If the fields are not empty, check the DB for email
    const emailExists = await checkUserEmailValidity(email);
    if (emailExists.status === 200) {
      // i.e If a user with the provided email DOES NOT exist. Check checkEmailValidity() for more context
      return {
        status: 404,
        message: "The email provided is not associated with any accounts.",
      };
    }

    // Compare password
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      emailExists.user.password
    );

    // If the password provided is incorrect
    if (!isPasswordCorrect)
      return {
        status: 404,
        message: "Invalid email or password.",
      };

    const token = sign(emailExists);
    console.log(token);

    // TODO: If user has 2FA turned on, Send OTP to user's email
    // return {
    //     status: 200,
    //     message: 'An OTP was sent to your registered email.'
    // }

    return {
      token: token,
      status: 200,
      message: "Log in successful!",
    };
  }
}
