import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { getArticleById, createArticle, updateArticle } from "@/features/knowledge/services/kbService";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  const { user } = useAuth();

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
          toast.error("Article not found");
          navigate("/kb");
        } finally {
          setIsLoading(false);
        }
      };
      fetchArticle();
    }
  }, [articleId, isEditing, navigate]);

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
        toast.success("Article updated");
        navigate(`/kb/${articleId}`);
      } else {
        const newArticle = await createArticle(formData, user.uid);
        toast.success("Article created");
        navigate(`/kb/${newArticle.id}`);
      }
    } catch (error) {
      toast.error(isEditing ? "Failed to update article" : "Failed to create article");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <Button variant="ghost" onClick={() => navigate(-1)} className="-ml-4 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Article" : "Create New Article"}</CardTitle>
            <CardDescription>
              Write helpful content for your users using Markdown format.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="title">Article Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  required 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g., How to reset your password" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select onValueChange={handleCategoryChange} value={formData.category} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="getting-started">Getting Started</SelectItem>
                      <SelectItem value="account">Account & Billing</SelectItem>
                      <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
                      <SelectItem value="features">Features</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Brief Summary</Label>
                <Textarea 
                  id="summary" 
                  name="summary" 
                  required 
                  value={formData.summary} 
                  onChange={handleChange} 
                  placeholder="A short description of this article..." 
                  className="h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown Supported)</Label>
                <Textarea 
                  id="content" 
                  name="content" 
                  required 
                  value={formData.content} 
                  onChange={handleChange} 
                  placeholder="# Heading 1&#10;&#10;Write your content here..." 
                  className="min-h-[400px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  You can use standard Markdown like **bold**, *italics*, [links](), and code blocks.
                </p>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : (isEditing ? "Save Changes" : "Publish Article")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
