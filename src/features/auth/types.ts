export interface SignInData {
  email: string;
  password: string;
}

export interface ProfileData {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}
