import { Guid } from "guid-typescript";

export interface TokenApiDTO {
    accessToken: string;
    refreshToken: string;
    userId: Guid; // Add userId property
  }
  