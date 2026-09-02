import { useState } from "react";
import { useAuth } from "@/features/auth/AuthProvider";
import { updateUserProfile } from "@/features/auth/services/authService";
import { uploadAvatar } from "@/features/tickets/services/storageService";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Shield, Camera } from "lucide-react";

export default function UserProfile() {
  const { user, role } = useAuth();
  
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user?.photoURL || null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let newPhotoURL = user?.photoURL;
      
      if (file) {
        newPhotoURL = await uploadAvatar(user.uid, file);
      }

      await updateUserProfile(displayName, newPhotoURL);
      
      toast.success("Profile updated successfully!");
      // The browser/auth state might need a refresh to fully propagate,
      // but standard firebase re-evaluates the token if forced.
      // For now, the visual feedback is enough.
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your display name and profile picture.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b">
                <Avatar className="h-24 w-24 border">
                  <AvatarImage src={previewUrl} />
                  <AvatarFallback className="text-2xl">
                    {displayName ? displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md transition-colors">
                      <Camera className="h-4 w-4" />
                      <span>Change Picture</span>
                    </div>
                  </Label>
                  <Input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 256x256px. Max 2MB.
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Display Name
                  </Label>
                  <Input 
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email Address
                  </Label>
                  <Input 
                    id="email"
                    value={user.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Email addresses cannot be changed directly.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Current Role
                  </Label>
                  <Input 
                    id="role"
                    value={role.charAt(0).toUpperCase() + role.slice(1)}
                    disabled
                    className="bg-muted font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving Changes..." : "Save Changes"}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
