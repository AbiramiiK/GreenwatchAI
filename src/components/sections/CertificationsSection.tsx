import { BadgeCheck, ShieldAlert, ScanEye } from 'lucide-react'
import Card from '../ui/Card'
import AiTag from '../ui/AiTag'
import type { Company } from '../../types'

export default function CertificationsSection({ company }: { company: Company }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Certification Verification</h2>
          <p className="text-sm text-navy-500">Cross-checked against verified certification registries</p>
        </div>
        <AiTag label="AI Evidence Matching" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {company.certifications.map((cert) => (
          <Card key={cert.id} className={cert.verified ? 'border-emerald-500/30' : 'border-red-500/30'}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    cert.verified ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                  }`}
                >
                  {cert.verified ? <BadgeCheck className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                </span>
                <div>
                  <p className="font-semibold text-white">{cert.name}</p>
                  <p className="text-xs text-navy-500">{cert.source}</p>
                </div>
              </div>
            </div>
            <div
              className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                cert.verified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
              }`}
            >
              {cert.verified ? '🟢 VERIFIED' : '🔴 NOT VERIFIED'}
            </div>
            {cert.note && <p className="mt-2 text-xs leading-relaxed text-navy-500">{cert.note}</p>}
          </Card>
        ))}
      </div>

      <Card className="mt-4 border-white/10 bg-navy-800/50">
        <div className="flex items-start gap-3">
          <ScanEye className="mt-0.5 h-5 w-5 shrink-0 text-navy-500" />
          <div>
            <p className="text-sm font-bold text-navy-100">Shadow Label Detection</p>
            <p className="mt-1 text-sm leading-relaxed text-navy-500">
              AI identifies logos or environmental labels that visually resemble official certifications but cannot be
              verified against any authoritative registry &mdash; a common greenwashing pattern.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
