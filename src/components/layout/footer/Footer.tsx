import FooterLinks from "./FooterLinks";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <FooterLinks />
      </div>
      <Copyright />
    </footer>
  );
}
