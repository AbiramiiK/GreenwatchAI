import { useState } from 'react'
import { CheckCircle2, Circle, Wand2 } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import AiTag from '../ui/AiTag'
import { useToast } from '../../hooks/useToast'
import type { Company } from '../../types'

export default function RecommendedActionsSection({ company }: { company: Company }) {
  const [done, setDone] = useState<string[]>([])
  const [generated, setGenerated] = useState(false)
  const { push } = useToast()

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-navy-900">AI Recommended Actions</h2>
        <AiTag label="Explainable AI" />
      </div>
      <ul className="space-y-2.5">
        {company.recommendedActions.map((action) => {
          const checked = done.includes(action.id)
          return (
            <li key={action.id}>
              <button
                onClick={() => setDone((prev) => (checked ? prev.filter((id) => id !== action.id) : [...prev, action.id]))}
                className="flex w-full items-start gap-2.5 rounded-xl px-2 py-1.5 text-left hover:bg-navy-50"
              >
                {checked ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 shrink-0 text-navy-300" />
                )}
                <span className={`text-sm ${checked ? 'text-navy-400 line-through' : 'text-navy-700'}`}>{action.text}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <Button
        variant={generated ? 'secondary' : 'primary'}
        className="mt-5 w-full"
        onClick={() => {
          setGenerated(true)
          push({ kind: 'success', title: 'Action plan generated', message: `A prioritized remediation plan for ${company.name} is ready.` })
        }}
      >
        <Wand2 className="h-4 w-4" />
        {generated ? 'ACTION PLAN GENERATED' : 'GENERATE ACTION PLAN'}
      </Button>
    </Card>
  )
}
