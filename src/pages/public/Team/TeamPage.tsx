import TeamHero from '../../../components/team/TeamHero/TeamHero';

import TeamFilters from '../../../components/team/TeamFilters/TeamFilters';

import TeamGrid from '../../../components/team/TeamGrid/TeamGrid';

import { useTeam } from '../../../hooks/useTeam';

export default function TeamPage() {
  const {
    activeFilter,
    setActiveFilter,

    search,
    setSearch,

    filteredMembers,
  } = useTeam();

  return (
    <div>
      <TeamHero
        search={search}
        setSearch={setSearch}
      />

      <TeamFilters
        activeFilter={activeFilter}
        setActiveFilter={
          setActiveFilter
        }
      />

      <TeamGrid
        members={filteredMembers}
      />
    </div>
  );
}