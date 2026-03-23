import { ArticleEditor } from '../../components/ArticleEditor/ArticleEditor';
export function AdminArticleEditor() {
  return (
    <div className="py-6">
      <ArticleEditor isAdmin={true} />
    </div>
  );
}