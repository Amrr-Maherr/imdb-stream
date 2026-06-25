import FooterLinks from "./FooterLinks";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="app-container py-12">
        <FooterLinks />
      </div>
      <Copyright />
    </footer>
  );
}
