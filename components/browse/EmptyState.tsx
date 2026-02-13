
export default function EmptyState() {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold text-gray-900">No artisans found</h2>
      <p className="mt-3 text-gray-600">
        Try adjusting your filters or search terms
      </p>
      <div className="mt-6 text-sm text-gray-500">
        Suggestions:
        <ul className="mt-2 list-disc list-inside">
          <li>Remove some filters</li>
          <li>Try a broader search term</li>
          <li>Check back later — new artisans join daily!</li>
        </ul>
      </div>
    </div>
  );
}