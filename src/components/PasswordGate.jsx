import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { cn } from "../lib/utils";

const CORRECT_PASSWORD = "admin1234";

export default function PasswordGate({ onUnlock }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter your email to continue.");
      return;
    }

    if (password === CORRECT_PASSWORD) {
      setError("");
      onUnlock();
    } else {
      setError("Invalid email or password. Please try again.");
      setPassword("");
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background px-4 py-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-secondary p-4">
            <Lock
              className="size-8 text-foreground"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        </div>

        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl text-balance">
              Welcome back
            </CardTitle>
            <CardDescription className="text-pretty">
              Sign in with your work email and password to access this site.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="you@company.com"
                  autoComplete="email"
                  autoFocus
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="pr-10"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "login-error" : undefined}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              {error && (
                <Alert id="login-error" variant="destructive" aria-live="assertive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className={cn(
                  "w-full",
                  error && "focus-visible:ring-destructive"
                )}
                size="lg"
                disabled={!email.trim() || !password}
              >
                <ShieldCheck className="mr-2 size-4" aria-hidden="true" />
                Sign in
              </Button>
              <p className="text-center text-xs text-muted-foreground text-pretty">
                Access is restricted to authorized users only.
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
