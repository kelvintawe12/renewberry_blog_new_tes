import { useParams } from 'react-router-dom';

import {
  Globe,
  Linkedin,
  Facebook,
  Twitter,
  Award,
} from 'lucide-react';

import { teamMembers } from '../../../services/team.service';

import './TeamMemberPage.scss';

export default function TeamMemberPage() {
  const { slug } = useParams();

  const member = teamMembers.find(
    (item) => item.slug === slug
  );

  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <main className="teamMemberPage">
      {/* HERO */}
      <section className="teamMemberHero">
        <div className="teamMemberHero__overlay" />

        <div className="teamMemberHero__content">
          <img
            src={member.image}
            alt={member.name}
          />

          <div>
            <span>
              {member.department}
            </span>

            <h1>{member.name}</h1>

            <h2>{member.role}</h2>

            <p>{member.bio}</p>

            {/* SOCIALS */}
            <div className="teamMemberSocials">
              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                >
                  <Globe size={20} />
                </a>
              )}

              {member.facebook && (
                <a
                  href={member.facebook}
                  target="_blank"
                >
                  <Facebook size={20} />
                </a>
              )}

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                >
                  <Linkedin size={20} />
                </a>
              )}

              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                >
                  <Twitter size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="teamMemberDetails">
        {/* EXPERTISE */}
        <div className="teamMemberBlock">
          <h3>Expertise</h3>

          <div className="expertiseTags">
            {member.expertise.map(
              (item) => (
                <span key={item}>
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="teamMemberBlock">
          <h3>
            <Award size={20} />
            Achievements
          </h3>

          <ul>
            {member.achievements.map(
              (achievement) => (
                <li key={achievement}>
                  {achievement}
                </li>
              )
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}