import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Card from '../ui/Card'
import { ClaimStatusBadge } from '../ui/StatusBadge'
import ClaimDetailDrawer from './ClaimDetailDrawer'
import AiTag from '../ui/AiTag'
import type { Company } from '../../types'

export default function ClaimsSection({ company, initialClaimId }: { company: Company; initialClaimId?: string | null }) {
  const [openClaimId, setOpenClaimId] = useState<string | null>(initialClaimId ?? null)
  const openClaim = company.claims.find((c) => c.id === openClaimId) ?? null

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Claims vs Reality</h2>
          <p className="text-sm text-navy-400">What {company.name} says, checked against verified evidence.</p>
        </div>
        <AiTag label="AI Contradiction Detection" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {company.claims.map((claim) => (
          <Card
            key={claim.id}
            hoverable
            className="cursor-pointer"
            onClick={() => setOpenClaimId(claim.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-navy-400">{claim.code}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-navy-300" />
            </div>
            <p className="mt-2 text-sm font-semibold leading-snug text-navy-900">&ldquo;{claim.text}&rdquo;</p>
            <div className="mt-4">
              <ClaimStatusBadge status={claim.status} />
            </div>
            {claim.status !== 'unverified' && (
              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-navy-500">{claim.verdictReason}</p>
            )}
            {claim.status === 'unverified' && (
              <p className="mt-3 text-xs italic leading-relaxed text-navy-400">Insufficient evidence to verify this claim.</p>
            )}
          </Card>
        ))}
      </div>

      <ClaimDetailDrawer claim={openClaim} company={company} onClose={() => setOpenClaimId(null)} />
    </div>
  )
}
