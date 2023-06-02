import BranchModel from "../model/branch.model";

// This function checks if a user slug is valid - if it exists in the DB or not
export async function checkBranchSlugValidity(slug, userId) {
  const branchSlugExists = await BranchModel.findOne({ slug, user: userId });
  if (branchSlugExists)
    return {
      message:
        "A branch is already associated with the branch name / slug provided.",
      status: 409,
    };

  return {
    message: "Available",
    status: 200,
  };
}

// This function converts a text to slug
export function convertTextToSlug(text) {
  // Check if a branch already exists with the same slug
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug;
}
