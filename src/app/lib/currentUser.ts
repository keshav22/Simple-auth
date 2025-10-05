"use client";

import { UserData } from "./types_interfaces/user";

class CurrentUserService {
  private static instance: CurrentUserService;
  private user: UserData | null = null;
  private fetched: boolean = false;

  private constructor() {}

  public static getInstance(): CurrentUserService {
    if (!CurrentUserService.instance) {
      CurrentUserService.instance = new CurrentUserService();
    }
    return CurrentUserService.instance;
  }

  public async getUser(): Promise<UserData | null> {
    if (this.fetched) return this.user;

    try {
      const res = await fetch("/api/user", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data: { user_data: UserData } = await res.json();
        this.user = data.user_data;
      }

    } catch (error) {
      console.error("Error fetching user:", error);
      this.user = null;
    }

    this.fetched = true;
    return this.user;
  }

  public clearUser() {
    this.user = null;
    this.fetched = false;
  }
}

export default CurrentUserService.getInstance();
