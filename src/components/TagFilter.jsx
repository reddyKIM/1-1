import { useMemo, useState } from 'react';

export default function TagFilter({ articles = [] }) {
  const tags = useMemo(() => {
    const result = new Set();
    articles.forEach((article) => {
      article.tags?.forEach((tag) => result.add(tag));
    });
    return Array.from(result).sort();
  }, [articles]);

  const [activeTags, setActiveTags] = useState([]);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const clear = () => setActiveTags([]);

  const filteredArticles = useMemo(() => {
    if (activeTags.length === 0) return articles;
    return articles.filter((article) =>
      activeTags.every((tag) => article.tags?.includes(tag))
    );
  }, [activeTags, articles]);

  return (
    <section className="space-y-8" aria-label="뉴스 태그 필터">
      <div className="flex flex-wrap items-center gap-3">
        {tags.map((tag) => {
          const isActive = activeTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive
                  ? 'border-primary bg-primary text-white shadow-lg'
                  : 'border-neutral/30 bg-white/70 text-neutral hover:border-primary/60 hover:text-primary'
              }`}
              aria-pressed={isActive}
            >
              #{tag}
            </button>
          );
        })}
        <button
          type="button"
          onClick={clear}
          className="rounded-full border border-transparent bg-neutral/10 px-4 py-2 text-sm text-neutral transition hover:bg-neutral/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          필터 초기화
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <article
            key={article.slug}
            className="flex h-full flex-col justify-between rounded-[var(--radius-md)] bg-white/80 p-6 shadow-lg ring-1 ring-primary/10 transition hover:-translate-y-1 dark:bg-slate-900/70"
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                {new Intl.DateTimeFormat('ko-KR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }).format(new Date(article.date))}
              </p>
              <h3 className="text-xl font-semibold text-primary">{article.title}</h3>
              <p className="text-sm text-neutral/70 dark:text-neutral/40">{article.excerpt}</p>
              <ul className="flex flex-wrap gap-2" aria-label="태그">
                {article.tags?.map((tag) => (
                  <li key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <a
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:translate-x-1"
              href={`/media/${article.slug}`}
            >
              더 알아보기
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
        {filteredArticles.length === 0 && (
          <p className="rounded-[var(--radius-md)] bg-surface/70 p-6 text-sm text-neutral">
            선택한 태그에 해당하는 콘텐츠가 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}
