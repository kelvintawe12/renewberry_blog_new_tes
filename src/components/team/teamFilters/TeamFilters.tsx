import './TeamFilters.scss';

const filters = [
  'All',
  'Leadership',
  'Engineering',
  'Administration',
  'System Security'
];

interface Props {
  activeFilter: string;

  setActiveFilter: (
    value: string
  ) => void;
}

export default function TeamFilters({
  activeFilter,
  setActiveFilter,
}: Props) {
  return (
    <section className="teamFilters">
      <div className="teamFilters__wrapper">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() =>
              setActiveFilter(filter)
            }
            className={
              activeFilter === filter
                ? 'active'
                : ''
            }
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
}