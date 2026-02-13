import { FaCheckCircle, FaQuestionCircle, FaTimesCircle } from 'react-icons/fa'

type Props = {
  status: 'verified' | 'pending' | 'not_verified' | null
}

export default function VerificationBadge({ status }: Props) {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
        <FaCheckCircle className="text-green-600" /> Verified Artisan
      </span>
    )
  }

  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
        <FaQuestionCircle className="text-amber-600" /> Verification Pending
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-100 text-red-800 rounded-full text-sm font-medium">
      <FaTimesCircle className="text-red-600" /> Not Verified
    </span>
  )
}