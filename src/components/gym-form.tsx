"use client"

import { useState } from "react"

interface GymFormProps {
  onSubmit: (data: { workout: string }) => Promise<void>
  hasSubmittedToday: boolean
}

export function GymForm({ onSubmit, hasSubmittedToday }: GymFormProps) {
  const [workout, setWorkout] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onSubmit({ workout })
      setWorkout("")
    } finally {
      setIsLoading(false)
    }
  }

  if (hasSubmittedToday) {
    return (
      <div className="bg-gt-gold/10 rounded-lg border border-gt-gold p-6">
        <h2 className="text-lg font-medium text-gt-navy mb-2">
          Gym Workout Submitted ✅
        </h2>
        <p className="text-gt-gray">
          You've already submitted your gym workout for today. Great job staying consistent, Yellow Jacket!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gt-gold/20 p-6">
      <h2 className="text-lg font-medium text-gt-navy mb-4">
        Submit Today's Gym Workout
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="workout" className="block text-sm font-medium text-gt-navy">
            Workout Description
          </label>
          <textarea
            id="workout"
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gt-gold/30 rounded-md shadow-sm focus:outline-none focus:ring-gt-gold focus:border-gt-gold"
            placeholder="Describe your workout: exercises, sets, reps, duration, etc."
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gt-gold hover:bg-gt-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gt-gold disabled:opacity-50 transition-colors"
        >
          {isLoading ? "Submitting..." : "Submit Gym Workout"}
        </button>
      </form>
    </div>
  )
}