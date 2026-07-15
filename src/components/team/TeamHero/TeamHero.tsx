import './TeamHero.scss';

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function TeamHero({
  // search,
  // setSearch,
}: Props) {
  return (
    <section className="teamHero">
      <div className="teamHero__overlay" />

      <div className="container">
        <div className="teamHero__content">
          {/* <span className="teamHero__badge">
            Renewberry Collective
          </span> */}

         <h1 className="bg-danger text-white p-3">
             Meet The renewBerry <span>Team</span>
        </h1>
          <p className='team-descriptor'>
            Engineers, storytellers, and creators building a
            better digital experience together.
          </p>
        </div>
      </div>
    </section>
  );
}