import { useMemo, useState } from 'react';

import { teamMembers } from '../services/team.service';

export const useTeam = () => {
  const [activeFilter, setActiveFilter] =
    useState('All');

  const [search, setSearch] =
    useState('');

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const matchesFilter =
        activeFilter === 'All'
          ? true
          : member.department ===
            activeFilter;

      const matchesSearch =
        member.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesFilter &&
        matchesSearch
      );
    });
  }, [activeFilter, search]);

  return {
    activeFilter,
    setActiveFilter,

    search,
    setSearch,

    filteredMembers,
  };
};