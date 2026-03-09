import React from 'react';
import { Link } from 'react-router-dom';
import { Author } from '../data/mockData';
interface AuthorBioProps {
  author: Author;
}
export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 my-12">
      <img
        src={author.avatar}
        alt={author.name}
        className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 flex-shrink-0" />

      <div className="text-center sm:text-left">
        <h3 className="text-xl font-heading font-bold text-text-primary mb-1">
          <Link
            to={`/author/${author.username}`}
            className="hover:text-primary transition-colors">

            {author.name}
          </Link>
        </h3>
        <p className="text-primary font-medium text-sm mb-3">{author.role}</p>
        <p className="text-text-secondary leading-relaxed mb-4">{author.bio}</p>
        <Link
          to={`/author/${author.username}`}
          className="inline-flex items-center text-sm font-semibold text-primary hover:text-secondary transition-colors">

          View all posts by {author.name} &rarr;
        </Link>
      </div>
    </div>);

}