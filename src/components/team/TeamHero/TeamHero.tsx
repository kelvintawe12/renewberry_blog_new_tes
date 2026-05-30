import './TeamHero.scss';

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function TeamHero({
  search,
  setSearch,
}: Props) {
  return (
    <section className="teamHero">
      <div className="teamHero__overlay" />

      <div className="container">
        <div className="teamHero__content">
          <span className="teamHero__badge">
            Renewberry Collective
          </span>

          <h1>
            Meet The <span>Team</span>
          </h1>

          <p>
            Engineers, storytellers, and creators building a
            better digital experience together.
          </p>

          <div className="teamHero__search">
            <input className='bg-danger'
              type="text"
              placeholder="Search by expertise or name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}