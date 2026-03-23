import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = Array.from(doc.querySelectorAll('h2, h3'));
    
    const items: TOCItem[] = headingElements.map((el, index) => {
      const text = el.textContent || '';
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      // We need to inject these IDs into the actual rendered content too
      return {
        id: id || `heading-${index}`,
        text,
        level: parseInt(el.tagName.substring(1))
      };
    });

    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
      <div className="flex items-center gap-2 mb-4 text-primary font-bold">
        <List className="w-5 h-5" />
        <h3 className="font-heading uppercase tracking-wider text-sm">Table of Contents</h3>
      </div>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
            className={`block py-2 text-sm transition-all duration-200 border-l-2 pl-4 ${
              activeId === heading.id
                ? 'text-primary font-bold border-primary bg-primary/5'
                : 'text-text-secondary border-transparent hover:text-primary hover:border-primary/30'
            } ${heading.level === 3 ? 'ml-4' : ''}`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
