"use client"

import { useState } from "react"

interface LeetCodeFormProps {
  onSubmit: (data: { problemName: string; solvedWithHelp: boolean; learnings: string }) => Promise<void>
}

export function LeetCodeForm({ onSubmit }: LeetCodeFormProps) {
  const [problemName, setProblemName] = useState("")
  const [solvedWithHelp, setSolvedWithHelp] = useState(false)
  const [learnings, setLearnings] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onSubmit({ problemName, solvedWithHelp, learnings })
      setProblemName("")
      setSolvedWithHelp(false)
      setLearnings("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gt-gold/20 p-6">
      <h2 className="text-lg font-medium text-gt-navy mb-4">
        Submit LeetCode Problem
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="problemName" className="block text-sm font-medium text-gt-navy">
            Problem Name
          </label>
          <input
            type="text"
            id="problemName"
            required
            className="mt-1 block w-full px-3 py-2 border border-gt-gold/30 rounded-md shadow-sm focus:outline-none focus:ring-gt-gold focus:border-gt-gold"
            placeholder="e.g., Two Sum"
            value={problemName}
            onChange={(e) => setProblemName(e.target.value)}
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-gt-navy focus:ring-gt-gold border-gt-gold/30 rounded"
              checked={solvedWithHelp}
              onChange={(e) => setSolvedWithHelp(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gt-gray">
              I solved this with help
            </span>
          </label>
        </div>

        <div>
          <label htmlFor="learnings" className="block text-sm font-medium text-gt-navy">
            What did you learn?
          </label>
          <textarea
            id="learnings"
            required
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gt-gold/30 rounded-md shadow-sm focus:outline-none focus:ring-gt-gold focus:border-gt-gold"
            placeholder="Key insights, patterns, or techniques you learned..."
            value={learnings}
            onChange={(e) => setLearnings(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gt-tech-gold hover:bg-gt-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gt-gold disabled:opacity-50 transition-colors"
        >
          {isLoading ? "Submitting..." : "Submit LeetCode Problem"}
        </button>
      </form>
    </div>
  )
}