export function ProductCardSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="bg-gray-800 h-48"></div>
      <div className="p-4">
        <div className="bg-gray-800 h-4 rounded w-3/4 mb-2"></div>
        <div className="bg-gray-800 h-3 rounded w-1/2 mb-2"></div>
        <div className="bg-gray-800 h-3 rounded w-1/4 mb-4"></div>
        <div className="bg-gray-800 h-8 rounded w-full mb-2"></div>
        <div className="bg-gray-800 h-8 rounded w-full"></div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto py-8 px-6 animate-pulse">
        <div className="bg-gray-800 h-4 w-32 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-800 rounded-2xl h-96 mb-4"></div>
            <div className="flex gap-3">
              {[1,2,3].map(i => (
                <div key={i} className="bg-gray-800 rounded-xl w-20 h-20"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-gray-800 h-4 w-24 rounded mb-4"></div>
            <div className="bg-gray-800 h-8 w-3/4 rounded mb-4"></div>
            <div className="bg-gray-800 h-4 w-32 rounded mb-6"></div>
            <div className="bg-gray-800 h-10 w-40 rounded mb-6"></div>
            <div className="bg-gray-800 h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-800 h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-800 h-4 w-3/4 rounded mb-6"></div>
            <div className="bg-gray-800 h-12 w-full rounded mb-3"></div>
            <div className="bg-gray-800 h-12 w-full rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function OrdersSkeleton() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto py-8 px-6 animate-pulse">
        <div className="bg-gray-800 h-8 w-48 rounded mb-8"></div>
        {[1,2,3].map(i => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <div className="flex justify-between mb-4">
              <div className="bg-gray-800 h-4 w-32 rounded"></div>
              <div className="bg-gray-800 h-4 w-24 rounded"></div>
              <div className="bg-gray-800 h-4 w-20 rounded"></div>
              <div className="bg-gray-800 h-6 w-24 rounded-full"></div>
            </div>
            <div className="border-t border-gray-800 pt-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-gray-800 w-14 h-14 rounded-xl"></div>
                <div className="flex-1">
                  <div className="bg-gray-800 h-4 w-3/4 rounded mb-2"></div>
                  <div className="bg-gray-800 h-3 w-1/4 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HomeSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6 animate-pulse">
      <div className="bg-gray-800 h-8 w-48 rounded mx-auto mb-10"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="bg-gray-800 h-48"></div>
            <div className="p-4">
              <div className="bg-gray-800 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-800 h-3 rounded w-1/4 mb-4"></div>
              <div className="bg-gray-800 h-8 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}