import { roles } from "../data/roles";

export default function OrganizationPage() {
  return (
    <section className="organization-page">
      <h2>Leadership & Management</h2>

      <div className="organization-list">
        {roles.map((person) => (
          <div
            className="organization-card"
            key={`${person.firstName}-${person.lastName}`}
          >
            <span>
              {person.firstName} {person.lastName}
            </span>

            <strong>{person.role}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}