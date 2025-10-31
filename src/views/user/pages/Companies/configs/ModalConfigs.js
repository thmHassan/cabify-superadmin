import ApiService from "../../../../../services/ApiService";
import { apiEditCompanyDetails } from "../../../../../services/CompanyService";
import {
  apiCreateOnboarding,
  apiEditOnboarding,
} from "../../../../../services/OnboardingService";

export const MODAL_CONFIG = {
  company: {
    new: {
      api: ApiService.createCompany,
      successMessage: "Company created successfully:",
    },
    edit: {
      api: apiEditCompanyDetails,
      successMessage: "Company edited successfully:",
    },
  },
  onboarding: {
    new: {
      api: apiCreateOnboarding,
      successMessage: "Onboarding created successfully:",
    },
    edit: {
      api: apiEditOnboarding,
      successMessage: "Onboarding edited successfully:",
    },
  },
};
