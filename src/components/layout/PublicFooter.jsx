import { Link } from "react-router-dom";
import { LifeBuoy } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-background pt-20 pb-10 border-t">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-primary/10 text-primary p-2 rounded-xl border border-primary/20">
              <LifeBuoy className="h-6 w-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight">
              HelpDesk Pro
            </span>
          </div>
          <p className="text-base text-muted-foreground max-w-sm mb-6">
            A meticulously designed workspace for modern support teams. Build
            relationships, not backlogs.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-foreground tracking-tight">
            Product
          </h4>
          <ul className="space-y-4 text-muted-foreground">
            <li>
              <Link
                to="/features"
                className="hover:text-primary transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="hover:text-primary transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Changelog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-foreground tracking-tight">
            Resources
          </h4>
          <ul className="space-y-4 text-muted-foreground">
            <li>
              <Link
                to="/kb"
                className="hover:text-primary transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                API Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Community
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-foreground tracking-tight">
            Company
          </h4>
          <ul className="space-y-4 text-muted-foreground">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Careers
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact Support
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Partners
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} HelpDesk Pro. All rights reserved.</p>
        <div className="flex gap-6 mt-6 md:mt-0">
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Cookie Settings
          </a>
        </div>
      </div>
    </footer>
  );
}
