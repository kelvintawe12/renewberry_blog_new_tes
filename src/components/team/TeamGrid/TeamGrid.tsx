import TeamCard from '../TeamCard/TeamCard';

import './TeamGrid.scss';

interface Props {
  members: any[];
}

export default function TeamGrid({
  members,
}: Props) {
  return (
    <section className="teamGrid">
      <div className="teamGrid__wrapper">
        {members.map((member) => (
          <TeamCard
            key={member.id}
            member={member}
          />
        ))}
      </div>
    </section>
  );
}