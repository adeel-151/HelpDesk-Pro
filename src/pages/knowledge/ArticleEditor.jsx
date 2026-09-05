import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { getArticleById, createArticle, updateArticle } from "@/features/knowledge/services/kbService";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

export default function ArticleEditor() {
  const { articleId } = useParams();
  const isEditing = !!articleId;
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    content: ""
  });

  useEffect(() => {
    if (isEditing) {
      const fetchArticle = async () => {
        try {
          const data = await getArticleById(articleId);
          setFormData({
            title: data.title,
            category: data.category,
            summary: data.summary,
            content: data.content
          });
        } catch (error) {
          toast.error("ARTICLE_NOT_FOUND");
          navigate(`/${role}/kb`);
        } finally {
          setIsLoading(false);
        }
      };
      fetchArticle();
    }
  }, [articleId, isEditing, navigate, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (val) => {
    setFormData(prev => ({ ...prev, category: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateArticle(articleId, formData);
        toast.success("ARTICLE_UPDATED");
        navigate(`/${role}/kb/${articleId}`);
      } else {
        const newArticle = await createArticle(formData, user.uid);
        toast.success("ARTICLE_PUBLISHED");
        navigate(`/${role}/kb/${newArticle.id}`);
      }
    } catch (error) {
      toast.error(isEditing ? "UPDATE_FAILED" : "PUBLISHING_FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="w-full h-full p-4 sm:p-8 flex justify-center items-center bg-background">
      <div className="text-[10px] uppercase font-bold tracking-widest animate-pulse">DECRYPTING_ARTICLE_DATA...</div>
    </div>
  );

  return (
    <div className="w-full h-full p-4 sm:p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <Button variant="ghost" onClick={() => navigate(-1)} className="-ml-4 mb-4 rounded-none hover:bg-black/5 dark:hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold">
          <ArrowLeft className="mr-2 h-4 w-4" /> ABORT_OPERATION
        </Button>

        <div className="border-2 border-black dark:border-white bg-background overflow-hidden relative">
          <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            // AUTHORING_MODE
          </div>
          <div className="bg-black/5 dark:bg-white/5 border-b-2 border-black dark:border-white p-6">
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">{isEditing ? "EDIT_ARTICLE" : "CREATE_NEW_ARTICLE"}</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">
              // FORMAT: MARKDOWN_STRICT
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[10px] uppercase tracking-widest font-bold">ARTICLE_TITLE</Label>
                <Input 
                  id="title" 
                  name="title" 
                  required 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="E.G., HOW TO RESET YOUR PASSWORD" 
                  className="rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-[10px] font-bold h-11"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold">CATEGORY</Label>
                  <Select onValueChange={handleCategoryChange} value={formData.category} required>
                    <SelectTrigger className="rounded-none border-black/20 dark:border-white/20 h-11 text-[10px] font-bold uppercase tracking-widest">
                      <SelectValue placeholder="SELECT CATEGORY" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-black/20 dark:border-white/20">
                      <SelectItem value="getting-started" className="text-[10px] font-bold uppercase tracking-widest rounded-none">GETTING STARTED</SelectItem>
                      <SelectItem value="account" className="text-[10px] font-bold uppercase tracking-widest rounded-none">ACCOUNT & BILLING</SelectItem>
                      <SelectItem value="troubleshooting" className="text-[10px] font-bold uppercase tracking-widest rounded-none">TROUBLESHOOTING</SelectItem>
                      <SelectItem value="features" className="text-[10px] font-bold uppercase tracking-widest rounded-none">FEATURES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary" className="text-[10px] uppercase tracking-widest font-bold">BRIEF_SUMMARY</Label>
                <Textarea 
                  id="summary" 
                  name="summary" 
                  required 
                  value={formData.summary} 
                  onChange={handleChange} 
                  placeholder="A SHORT DESCRIPTION OF THIS ARTICLE..." 
                  className="h-20 rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-[10px] font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-[10px] uppercase tracking-widest font-bold">CONTENT (MARKDOWN_SUPPORTED)</Label>
                <Textarea 
                  id="content" 
                  name="content" 
                  required 
                  value={formData.content} 
                  onChange={handleChange} 
                  placeholder="# HEADING 1&#10;&#10;WRITE YOUR CONTENT HERE..." 
                  className="min-h-[400px] font-mono text-sm rounded-none border-black/20 dark:border-white/20"
                />
                <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest font-bold">
                  // USE STANDARD MARKDOWN: **BOLD**, *ITALICS*, [LINKS](), AND CODE BLOCKS.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-black/10 dark:border-white/10">
                <Button type="button" variant="outline" onClick={() => navigate(-1)} className="rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-xs font-bold h-12 px-8">ABORT</Button>
                <Button type="submit" disabled={isSubmitting} className="rounded-none bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 uppercase tracking-widest text-xs font-bold h-12 px-8">
                  {isSubmitting ? "PROCESSING..." : (isEditing ? "COMMIT_CHANGES" : "PUBLISH_ARTICLE")}
                </Button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
