'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParams?: string;
}

export default function Pagination({ currentPage, totalPages, basePath, queryParams = '' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  // Build page numbers with ellipsis
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  const buildHref = (page: number) => {
    const sep = queryParams ? '&' : '?';
    return queryParams
      ? `${basePath}?${queryParams}${sep}page=${page}`
      : `${basePath}?page=${page}`;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="flex items-center gap-1 px-4 py-2 border border-border-gold text-text-muted hover:text-gold hover:border-gold/40 rounded font-body text-sm transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 border border-border-gold/30 text-text-muted/30 rounded font-body text-sm cursor-not-allowed">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </span>
      )}

      {/* Page Numbers */}
      {pages.map((page, i) =>
        typeof page === 'string' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-text-muted font-body text-sm">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            className={`w-10 h-10 flex items-center justify-center rounded font-body text-sm transition-all duration-300 ${
              page === currentPage
                ? 'bg-gold text-background font-semibold'
                : 'border border-border-gold text-text-muted hover:text-gold hover:border-gold/40'
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex items-center gap-1 px-4 py-2 border border-border-gold text-text-muted hover:text-gold hover:border-gold/40 rounded font-body text-sm transition-all duration-300"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 border border-border-gold/30 text-text-muted/30 rounded font-body text-sm cursor-not-allowed">
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </nav>
  );
}
