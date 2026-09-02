import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getArticleById, deleteArticle } from "@/features/knowledge/services/kbService";
import { useAuth } from "@/features/auth/AuthProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ArticleDetail() {
  const { articleId } = useParams();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(articleId);
        setArticle(data);
      } catch (error) {
        toast.error("Article not found");
        navigate("/kb");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [articleId, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await deleteArticle(articleId);
      toast.success("Article deleted");
      navigate("/kb");
    } catch (error) {
      toast.error("Failed to delete article");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 sm:p-8 animate-in fade-in duration-500 flex justify-center items-center">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="w-full h-full p-4 sm:p-8 animate-in fade-in duration-500 bg-background/50">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/kb")} className="-ml-4 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Help Center
          </Button>

          {(role === "admin" || role === "agent") && (
            <div className="flex gap-2">
              <Link to={`/kb/${articleId}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          )}
        </div>

        <article className="prose prose-slate dark:prose-invert max-w-none lg:prose-lg">
          <div className="mb-8 border-b pb-8">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {article.category}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {article.summary}
            </p>
          </div>
          
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
