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

const CORRECT_PASSWORD = "admin1234";

export default function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setError("");
      onUnlock();
    } else {
      setError("Incorrect password. Please try again.");
      setShake(true);
      setPassword("");
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-secondary p-4">
            <Lock className="w-8 h-8 text-foreground" strokeWidth={1.5} />
          </div>
        </div>

        <Card className={shake ? "animate-shake" : ""}>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Password Protected</CardTitle>
            <CardDescription>
              Enter the password to access this site.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

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
                    autoFocus
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" size="lg">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Unlock
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Access is restricted to authorized users only.
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.45s ease-in-out;
        }
      `}</style>
    </div>
  );
}
