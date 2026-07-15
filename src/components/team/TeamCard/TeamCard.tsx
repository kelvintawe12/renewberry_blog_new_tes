import { Link } from 'react-router-dom';

import './TeamCard.scss';

interface Props {
  member: any;
}

export default function TeamCard({
  member,
}: Props) {
  return (
    <Link
      to={`/team/${member.slug}`}
      className="teamCard"
    >
      <img
        src={member.image}
        alt={member.name}
      />

      <div className="teamCard__content">
        <h3>{member.name}</h3>

        <span>{member.role}</span>

        <p>{member.bio}</p>
      </div>
    </Link>
  );
}