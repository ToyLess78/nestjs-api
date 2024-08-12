export interface UserDto {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date;
}

export interface AuthResponse {
  user: UserDto;
  token: string;
}
