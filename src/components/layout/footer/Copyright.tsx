export default function Copyright() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-border px-4 py-4 md:px-8">
      <p className="text-center text-xs text-muted-foreground">
        &copy; {year} IMDb. All rights reserved.
      </p>
    </div>
  );
}
