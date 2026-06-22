type PersonSidebarProps = {
  knownForDepartment: string;
  gender: number;
  birthday: string | null;
  deathday: string | null;
  placeOfBirth: string | null;
  alsoKnownAs: string[];
  popularity: number;
};

function genderLabel(gender: number): string {
  if (gender === 1) return "Female";
  if (gender === 2) return "Male";
  return "Non-binary";
}

export function PersonSidebar({
  knownForDepartment,
  gender,
  birthday,
  deathday,
  placeOfBirth,
  alsoKnownAs,
  popularity,
}: PersonSidebarProps) {
  return (
    <aside className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
          Personal Info
        </h3>
        <div className="space-y-3">
          {knownForDepartment && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Known For</h4>
              <p className="text-sm text-foreground mt-0.5">{knownForDepartment}</p>
            </div>
          )}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">Gender</h4>
            <p className="text-sm text-foreground mt-0.5">{genderLabel(gender)}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">Popularity</h4>
            <p className="text-sm text-foreground mt-0.5">{popularity.toFixed(0)}</p>
          </div>
          {birthday && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Birthday</h4>
              <p className="text-sm text-foreground mt-0.5">
                {new Date(birthday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
          {deathday && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Deathday</h4>
              <p className="text-sm text-foreground mt-0.5">
                {new Date(deathday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
          {placeOfBirth && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Place of Birth</h4>
              <p className="text-sm text-foreground mt-0.5">{placeOfBirth}</p>
            </div>
          )}
          {alsoKnownAs.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Also Known As</h4>
              <div className="text-sm text-foreground mt-0.5 space-y-0.5">
                {alsoKnownAs.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
