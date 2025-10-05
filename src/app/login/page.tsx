"use client";

import React, { useState, FormEvent, useCallback, useEffect } from "react";
import "./page.css";
import { useRouter } from "next/navigation";
import { UserData } from "../lib/types_interfaces/user";
import currentUserService from "@/app/lib/currentUser";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const validateEmail = useCallback((email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        if (res.status == 403) {
          setError(
            "User is blocked please contact helpdesk@gmail.com for any queries"
          );
        } else {
          setError("Wrong email or password");
        }
        setLoading(false);
        return;
      }

      const data: { user_data: UserData } = await res.json();

      currentUserService.clearUser();

      if (data.user_data.role == "admin") {
        router.replace("/admin/users");
      } else {
        router.replace("/projects");
      }
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="text-center">
        <input
          id="email"
          type="email"
          className="input"
          placeholder="Email"
          data-testid="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
      </div>

      <input
        id="password"
        type="password"
        className="input"
        data-testid="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

      <button
        data-testid="login-btn"
        className="btn"
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
