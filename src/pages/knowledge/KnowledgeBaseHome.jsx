import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "@/features/knowledge/services/kbService";
import { useAuth } from "@/features/auth/AuthProvider";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function KnowledgeBaseHome() {
  const { role } = useAuth();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Failed to load articles", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full p-4 sm:p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="border-2 border-black dark:border-white p-4 sm:p-8 bg-white/5 dark:bg-black/5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            // DATA_REPOSITORY
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase mt-4">KNOWLEDGE_BASE</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-4 font-bold max-w-xl mx-auto leading-relaxed">
            SEARCH THE REPOSITORY OR BROWSE ARCHIVED CATEGORIES.
          </p>
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="SEARCH FOR ARTICLES..." 
              className="pl-12 h-12 text-xs rounded-none border-2 border-black dark:border-white bg-background font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] focus-visible:ring-0 focus-visible:ring-offset-0 transition-shadow hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-black dark:border-white pb-4">
          <div>
            <h2 className="text-xl font-black tracking-[0.2em] uppercase">LATEST_ARTICLES</h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">// RECENT_ADDITIONS</p>
          </div>
          {(role === "admin" || role === "agent") && (
            <Link to={`/${role}/kb/new`}>
              <Button className="w-full sm:w-auto rounded-none bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-bold uppercase tracking-widest text-xs">
                <PlusCircle className="mr-2 h-4 w-4" /> CREATE_ARTICLE
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-none" />
            <Skeleton className="h-32 w-full rounded-none" />
            <Skeleton className="h-32 w-full rounded-none" />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground border border-dashed border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5">
            <BookOpen className="mx-auto h-12 w-12 opacity-20 mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">NO_ARTICLES_FOUND_IN_ARCHIVE.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <Link to={`/${role}/kb/${article.id}`} key={article.id}>
                <div className="h-full border border-black/20 dark:border-white/20 hover:border-primary transition-colors bg-card group relative p-6">
                  <div className="absolute top-0 right-0 p-2 text-[10px] uppercase font-bold text-primary tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    [READ]
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 pb-2 border-b border-black/10 dark:border-white/10">
                    // {article.category}
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest group-hover:text-primary transition-colors mb-2 line-clamp-2 leading-relaxed">
                    {article.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
