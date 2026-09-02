import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "@/features/knowledge/services/kbService";
import { useAuth } from "@/features/auth/AuthProvider";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-extrabold tracking-tight">How can we help?</h1>
          <p className="text-muted-foreground text-lg">Search our knowledge base or browse categories below.</p>
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for articles..." 
              className="pl-10 h-12 text-lg rounded-full bg-background shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
          {(role === "admin" || role === "agent") && (
            <Link to="/kb/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Article
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="mx-auto h-12 w-12 opacity-20 mb-4" />
            <p>No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <Link to={`/kb/${article.id}`} key={article.id}>
                <Card className="hover:shadow-md transition-shadow h-full cursor-pointer group">
                  <CardHeader>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      {article.category}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {article.summary}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
