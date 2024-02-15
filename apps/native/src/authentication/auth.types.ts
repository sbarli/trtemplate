import { CreateUserInput, GetUserInput, UserWithoutPassword } from '@changeme/gql';

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type TAuthContext = {
  isAuthenticated?: boolean;
  isLoading: boolean;
  login: (loginData: GetUserInput) => void;
  loginError?: string;
  logout: () => void;
  signup: (signupData: CreateUserInput) => void;
  signupError?: string;
  user?: UserWithoutPassword;
};

export interface IAuthCallback {
  authToken?: string;
  refreshToken?: string;
  success: boolean;
  user?: UserWithoutPassword;
}

export type AuthCallbackFn = ({ authToken, success, user }: IAuthCallback) => Promise<boolean>;
