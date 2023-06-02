import UserModel from "../model/user.model";

// This method validates input fields
export async function validateFields(args) {
  args.forEach((arg) => {
    if (!arg || arg === "") {
      return {
        status: 404,
        message: "Please fill in the missing fields",
      };
    }
  });
}

// This method checks if a user email is valid - if it exists in the DB or not
export async function checkUserEmailValidity(email) {
  const userExists = await UserModel.findOne({ email });
  if (userExists)
    return {
      message: "An account is already associated with the email provided.",
      status: 409,
      user: userExists,
    };

  return {
    message: "Available",
    status: 200,
  };
}

// This method checks if a user email is valid - if it exists in the DB or not
export async function checkUsernameValidity(email) {
  const userExists = await UserModel.findOne({ username });
  if (userExists)
    return {
      message: "An account is already associated with the username provided.",
      status: 409,
      user: userExists,
    };

  return {
    message: "Available",
    status: 200,
  };
}

// This  service validates the user log in OTP
export async function validateLoginOTP(otp) {}

// This  service validates the user OTP
export async function validateOTP(otp) {}
