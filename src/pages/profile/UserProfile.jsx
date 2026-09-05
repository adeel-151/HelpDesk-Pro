import { useState } from "react";
import { useAuth } from "@/features/auth/AuthProvider";
import { updateUserProfile } from "@/features/auth/services/authService";
import { uploadAvatar } from "@/features/tickets/services/storageService";
import { toast } from "sonner";

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
      
      toast.success("PROFILE_DATA_UPDATED");
    } catch (error) {
      toast.error("UPDATE_FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="w-full h-full p-4 sm:p-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="border-b-2 border-black dark:border-white pb-6">
          <h1 className="text-3xl font-black uppercase tracking-[0.2em]">MY_PROFILE</h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">// MANAGE_ACCOUNT_SETTINGS</p>
        </div>

        <div className="border-2 border-black dark:border-white bg-background flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            // ID_{user.uid.slice(0,8)}
          </div>
          <div className="bg-black/5 dark:bg-white/5 border-b-2 border-black dark:border-white p-6">
            <h2 className="text-lg font-black uppercase tracking-[0.2em]">PERSONAL_INFORMATION</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">
              UPDATE_DISPLAY_NAME_AND_AVATAR
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-black/10 dark:border-white/10">
                <Avatar className="h-24 w-24 rounded-none border border-black/20 dark:border-white/20">
                  <AvatarImage src={previewUrl} className="rounded-none object-cover" />
                  <AvatarFallback className="text-2xl rounded-none bg-black/5 dark:bg-white/5 font-bold uppercase">
                    {displayName ? displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <Label htmlFor="avatar-upload" className="cursor-pointer inline-block">
                    <div className="flex items-center gap-2 border border-black/20 dark:border-white/20 hover:border-black/50 dark:hover:border-white/50 bg-transparent px-4 py-2 transition-colors">
                      <Camera className="h-4 w-4 text-foreground" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">CHANGE_PICTURE</span>
                    </div>
                  </Label>
                  <Input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    // REC_SIZE: 256x256PX. MAX_SIZE: 2MB.
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                    <User className="h-4 w-4" /> DISPLAY_NAME
                  </Label>
                  <Input 
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="ENTER FULL NAME"
                    className="rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-xs font-bold h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                    <Mail className="h-4 w-4" /> EMAIL_ADDRESS
                  </Label>
                  <Input 
                    id="email"
                    value={user.email}
                    disabled
                    className="rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-xs font-bold h-11 bg-black/5 dark:bg-white/5 opacity-70"
                  />
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">// EMAIL_ADDRESSES_LOCKED</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                    <Shield className="h-4 w-4" /> CURRENT_AUTHORIZATION_ROLE
                  </Label>
                  <Input 
                    id="role"
                    value={role.toUpperCase()}
                    disabled
                    className="rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-xs font-bold h-11 bg-black/5 dark:bg-white/5 opacity-70"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-black/10 dark:border-white/10 mt-6">
                <Button type="submit" disabled={isSubmitting} className="rounded-none bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 uppercase tracking-widest text-[10px] font-bold h-12 px-8 w-full sm:w-auto">
                  {isSubmitting ? "UPDATING..." : "COMMIT_CHANGES"}
                </Button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
