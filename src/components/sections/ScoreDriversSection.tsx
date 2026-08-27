import Card from '../ui/Card'
import ScoreBar from '../ui/ScoreBar'
import AiTag from '../ui/AiTag'
import type { Company } from '../../types'

export default function ScoreDriversSection({ company }: { company: Company }) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Key Score Drivers</h2>
        <AiTag label="AI Risk Scoring" />
      </div>
      <div className="space-y-5">
        {company.scoreDrivers.map((driver) => (
          <ScoreBar key={driver.key} label={driver.label} value={driver.value} description={driver.description} />
        ))}
      </div>
    </Card>
  )
}
