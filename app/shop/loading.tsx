export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="mb-8 space-y-3">
          <div className="h-8 w-40 bg-surface-raised rounded animate-pulse" />
          <div className="h-4 w-64 bg-surface-raised rounded animate-pulse" />
        </div>

        <div className="flex gap-8">
          {/* Sidebar skeleton — desktop */}
          <div className="hidden lg:block w-[260px] shrink-0 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 w-20 bg-surface-raised rounded animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-5 w-full bg-surface-raised rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Grid skeleton */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-surface border border-border-gold rounded overflow-hidden animate-pulse">
                <div className="aspect-square bg-surface-raised" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-surface-raised rounded w-3/4" />
                  <div className="flex gap-2">
                    <div className="h-5 w-12 bg-surface-raised rounded" />
                    <div className="h-5 w-12 bg-surface-raised rounded" />
                  </div>
                  <div className="h-4 bg-surface-raised rounded w-1/2" />
                  <div className="h-10 bg-surface-raised rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
