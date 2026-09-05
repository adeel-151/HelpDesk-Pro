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
        toast.error("ARTICLE_NOT_FOUND");
        navigate(`/${role}/kb`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [articleId, navigate, role]);

  const handleDelete = async () => {
    if (!window.confirm("CONFIRM_DELETION_PROTOCOL?")) return;
    try {
      await deleteArticle(articleId);
      toast.success("ARTICLE_DELETED");
      navigate(`/${role}/kb`);
    } catch (error) {
      toast.error("DELETION_FAILED");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 sm:p-8 flex justify-center items-center bg-background">
        <div className="text-[10px] uppercase font-bold tracking-widest animate-pulse">DECRYPTING_ARTICLE_DATA...</div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="w-full h-full p-4 sm:p-8 bg-background">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center border-b-2 border-black dark:border-white pb-6">
          <Button variant="ghost" onClick={() => navigate(`/${role}/kb`)} className="-ml-4 rounded-none hover:bg-black/5 dark:hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold">
            <ArrowLeft className="mr-2 h-4 w-4" /> ABORT_VIEW
          </Button>

          {(role === "admin" || role === "agent") && (
            <div className="flex gap-2">
              <Link to={`/${role}/kb/${articleId}/edit`}>
                <Button variant="outline" size="sm" className="rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-[10px] font-bold h-9">
                  <Edit className="mr-2 h-4 w-4" /> EDIT
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleDelete} className="rounded-none uppercase tracking-widest text-[10px] font-bold h-9">
                <Trash2 className="mr-2 h-4 w-4" /> DELETE
              </Button>
            </div>
          )}
        </div>

        <article className="prose prose-slate dark:prose-invert max-w-none lg:prose-lg border-2 border-black dark:border-white bg-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            // ARTICLE_{articleId.slice(0,6)}
          </div>
          <div className="mb-8 border-b-2 border-black dark:border-white pb-8 bg-black/5 dark:bg-white/5 -mx-8 md:-mx-12 -mt-8 md:-mt-12 p-8 md:p-12">
            <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 border border-primary/20 bg-primary/5 px-2 py-1 w-fit">
              [{article.category}]
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-[0.2em] uppercase mb-4 mt-0">
              {article.title}
            </h1>
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold font-mono">
              {article.summary}
            </p>
          </div>
          
          <div className="font-mono text-sm leading-relaxed prose-headings:font-black prose-headings:tracking-widest prose-headings:uppercase prose-a:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
