type Props = {
  bio?: string | null
}

export default function BioSection({ bio }: Props) {
  return (
    <div className="prose prose-gray max-w-none">
      {bio ? (
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{bio}</p>
      ) : (
        <p className="text-gray-500 italic">No professional bio added yet.</p>
      )}
    </div>
  )
}