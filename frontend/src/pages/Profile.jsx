import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { getProfileApi } from "@/api/auth";
import { cn } from "@/lib/utils";

export function Profile({ className }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/signin");
          return;
        }

        const res = await getProfileApi();
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className={cn("flex justify-center mt-10", className)}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <strong>Email:</strong> {user?.email}
          </div>
          {user?.name && (
            <div>
              <strong>Name:</strong> {user.name}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
