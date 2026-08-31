import React, { useState } from "react";

type Role = "DEVELOPER" | "CLIENT";

const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<Role>("DEVELOPER");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms and conditions.");
      return;
    }

    const account = {
      id: crypto.randomUUID(),
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      role,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("pataDevUser", JSON.stringify(account));
    localStorage.setItem("pataDevAuthenticated", "true");

    setSuccess(
      "Account created successfully. Redirecting to your dashboard..."
    );

    setTimeout(() => {
      window.location.href =
        role === "DEVELOPER"
          ? "/dashboard/developer"
          : "/dashboard/client";
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 35px rgba(15, 23, 42, 0.10)",
          padding: "36px",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Create your PataDev account
          </h1>

          <p
            style={{
              marginTop: "10px",
              marginBottom: 0,
              color: "#6b7280",
              fontSize: "15px",
            }}
          >
            Connect with clients and developers across Kenya.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          <button
            type="button"
            onClick={() => setRole("DEVELOPER")}
            style={{
              padding: "13px",
              borderRadius: "9px",
              border:
                role === "DEVELOPER"
                  ? "2px solid #7c3aed"
                  : "1px solid #d1d5db",
              background:
                role === "DEVELOPER" ? "#f5f3ff" : "#ffffff",
              color:
                role === "DEVELOPER" ? "#6d28d9" : "#374151",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Developer
          </button>

          <button
            type="button"
            onClick={() => setRole("CLIENT")}
            style={{
              padding: "13px",
              borderRadius: "9px",
              border:
                role === "CLIENT"
                  ? "2px solid #7c3aed"
                  : "1px solid #d1d5db",
              background:
                role === "CLIENT" ? "#f5f3ff" : "#ffffff",
              color:
                role === "CLIENT" ? "#6d28d9" : "#374151",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Client
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
              padding: "12px 14px",
              borderRadius: "8px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "#f0fdf4",
              color: "#15803d",
              border: "1px solid #bbf7d0",
              padding: "12px 14px",
              borderRadius: "8px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            Full name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              marginBottom: "17px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            Email address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              marginBottom: "17px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            Password
          </label>

          <div style={{ position: "relative", marginBottom: "17px" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 70px 13px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                color: "#6b7280",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            Confirm password
          </label>

          <div style={{ position: "relative", marginBottom: "18px" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 70px 13px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                color: "#6b7280",
                cursor: "pointer",
              }}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "9px",
              marginBottom: "22px",
              color: "#4b5563",
              fontSize: "14px",
              lineHeight: 1.5,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              style={{ marginTop: "4px" }}
            />

            <span>
              I agree to the PataDev terms and conditions and privacy policy.
            </span>
          </label>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "9px",
              background: "#7c3aed",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "22px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              window.location.href = "/login";
            }}
            style={{
              border: "none",
              background: "transparent",
              color: "#6d28d9",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
