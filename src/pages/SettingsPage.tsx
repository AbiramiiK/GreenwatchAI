import { useState } from 'react'
import { Bell, Database, Shield, User, Zap } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import { useToast } from '../hooks/useToast'

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-emerald-600' : 'bg-navy-700'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}
      />
    </button>
  )
}

export default function SettingsPage() {
  const { push } = useToast()
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [autoRescan, setAutoRescan] = useState(false)
  const [publicBenchmarks, setPublicBenchmarks] = useState(true)

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <PageHeader eyebrow="Preferences" title="Settings" subtitle="Manage your account, notifications, and AI analysis preferences." />

      <Card className="mb-5">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-4 w-4 text-navy-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-navy-500">Account</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-500">Full Name</label>
            <input defaultValue="Abirami K" className="w-full rounded-xl border border-white/10 bg-navy-900 px-3 py-2.5 text-sm text-navy-100 outline-none focus:border-emerald-400" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-500">Email</label>
            <input defaultValue="abiramikarthick2k7@gmail.com" className="w-full rounded-xl border border-white/10 bg-navy-900 px-3 py-2.5 text-sm text-navy-100 outline-none focus:border-emerald-400" />
          </div>
        </div>
      </Card>

      <Card className="mb-5">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-navy-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-navy-500">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-navy-100">Critical greenwashing alerts</p>
              <p className="text-xs text-navy-500">Get notified immediately for high-risk detections</p>
            </div>
            <Toggle checked={criticalAlerts} onChange={setCriticalAlerts} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-navy-100">Weekly digest</p>
              <p className="text-xs text-navy-500">Summary of new evidence and score changes</p>
            </div>
            <Toggle checked={weeklyDigest} onChange={setWeeklyDigest} />
          </div>
        </div>
      </Card>

      <Card className="mb-5">
        <div className="mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-navy-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-navy-500">AI Analysis</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-navy-100">Automatic re-scan on new filings</p>
            <p className="text-xs text-navy-500">Re-run the AI pipeline when a watched company files a new report</p>
          </div>
          <Toggle checked={autoRescan} onChange={setAutoRescan} />
        </div>
      </Card>

      <Card className="mb-5">
        <div className="mb-4 flex items-center gap-2">
          <Database className="h-4 w-4 text-navy-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-navy-500">Data Sources</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-navy-100">Share anonymized benchmarks</p>
            <p className="text-xs text-navy-500">Contribute anonymized scores to industry benchmark averages</p>
          </div>
          <Toggle checked={publicBenchmarks} onChange={setPublicBenchmarks} />
        </div>
      </Card>

      <Card className="mb-5 border-white/10 bg-navy-800/50">
        <div className="mb-2 flex items-center gap-2">
          <Shield className="h-4 w-4 text-navy-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-navy-500">About This Prototype</h2>
        </div>
        <p className="text-sm leading-relaxed text-navy-500">
          GREENWATCH AI is a demonstration prototype. All company data, claims, evidence, and AI analysis shown are
          simulated for the purpose of this Project Innovation Challenge and do not represent real findings about the
          named companies.
        </p>
      </Card>

      <button
        onClick={() => push({ kind: 'success', title: 'Settings saved', message: 'Your preferences have been updated.' })}
        className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-lift"
      >
        Save Changes
      </button>
    </div>
  )
}
