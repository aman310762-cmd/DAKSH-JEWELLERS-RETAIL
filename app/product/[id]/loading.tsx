export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-64 bg-surface-raised rounded animate-pulse mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image skeleton */}
          <div className="space-y-3">
            <div className="aspect-square bg-surface-raised rounded animate-pulse" />
            <div className="hidden md:flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 bg-surface-raised rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Info skeleton */}
          <div className="space-y-5">
            <div className="h-8 w-3/4 bg-surface-raised rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-7 w-32 bg-surface-raised rounded animate-pulse" />
              <div className="h-7 w-20 bg-surface-raised rounded animate-pulse" />
            </div>
            <div className="h-5 w-40 bg-surface-raised rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-surface-raised rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-surface-raised rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-surface-raised rounded animate-pulse" />
            </div>
            <div className="h-[1px] bg-border-gold" />
            <div className="h-8 w-48 bg-surface-raised rounded animate-pulse" />
            <div className="space-y-3 pt-4">
              <div className="h-12 bg-surface-raised rounded animate-pulse" />
              <div className="h-12 bg-surface-raised rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
