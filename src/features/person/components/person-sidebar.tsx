type PersonSidebarProps = {
  gender: number;
  popularity: number;
  adult: boolean;
};

function genderLabel(gender: number): string {
  if (gender === 1) return "Female";
  if (gender === 2) return "Male";
  return "Non-binary";
}

export function PersonSidebar({
  gender,
  popularity,
  adult,
}: PersonSidebarProps) {
  return (
    <aside className="space-y-8">
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
          Personal Info
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">Gender</h4>
            <p className="text-sm text-foreground mt-0.5">{genderLabel(gender)}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">Popularity</h4>
            <p className="text-sm text-foreground mt-0.5">{popularity.toFixed(0)}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">Adult</h4>
            <p className="text-sm text-foreground mt-0.5">{adult ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
