import React from 'react';
import { ArticleEditor } from '../../components/ArticleEditor/ArticleEditor';

export function CreatorArticleEditor() {
  return (
    <div className="py-6">
      <ArticleEditor isAdmin={false} />
    </div>
  );
}
