import { validateFields } from "../util/auth.helper";
import {
  checkBranchSlugValidity,
  convertTextToSlug,
} from "../util/branch.helper";

export class BranchService {
  constructor(BranchModel) {
    this.BranchModel = BranchModel;
  }

  async createBranch(userId, branchValues) {
    // Validate each field for missing fields
    const areFieldsEmpty = validateFields([
      userId,
      branchValues.branchName,
      branchValues.description,
    ]);

    // Return if a missing field is detected
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if branch slug is available
    const slug = convertTextToSlug(branchName);
    const branchExistsWithSlug = await checkBranchSlugValidity(slug, userId);
    // Return if branch slug is unavailable
    if (branchExistsWithSlug.status === 409) return branchExistsWithSlug;

    // Create branch
    const branch = await this.BranchModel.create({ ...branchValues });

    // Return a message if branch creation was successful
    return {
      status: 201,
      message: "Your branch has been created successfully!",
      branch: branch,
    };
  }
}
