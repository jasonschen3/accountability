"use client"

import { useEffect, useState } from "react"

interface LeetCodeSubmission {
  id: string
  problemName: string
  solvedWithHelp: boolean
  learnings: string
  createdAt: string
  user: {
    id: string
    name: string
  }
}

interface GymSubmission {
  id: string
  workout: string
  createdAt: string
  user: {
    id: string
    name: string
  }
}

export function SubmissionsFeed() {
  const [leetcodeSubmissions, setLeetcodeSubmissions] = useState<LeetCodeSubmission[]>([])
  const [gymSubmissions, setGymSubmissions] = useState<GymSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const [leetcodeRes, gymRes] = await Promise.all([
        fetch("/api/leetcode"),
        fetch("/api/gym"),
      ])

      if (leetcodeRes.ok && gymRes.ok) {
        const leetcodeData = await leetcodeRes.json()
        const gymData = await gymRes.json()
        
        setLeetcodeSubmissions(leetcodeData)
        setGymSubmissions(gymData)
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const allSubmissions = [
    ...leetcodeSubmissions.map(s => ({ ...s, type: "leetcode" as const })),
    ...gymSubmissions.map(s => ({ ...s, type: "gym" as const })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gt-gold/20">
      <div className="px-6 py-4 border-b border-gt-gold/30">
        <h2 className="text-lg font-medium text-gt-navy">
          Yellow Jacket Activity Feed
        </h2>
        <p className="text-sm text-gt-gray mt-1">
          See what fellow Yellow Jackets are working on
        </p>
      </div>
      
      <div className="divide-y divide-gt-gold/20">
        {allSubmissions.length === 0 ? (
          <div className="p-6 text-center text-gt-gray">
            No submissions yet. Be the first Yellow Jacket to share your progress!
          </div>
        ) : (
          allSubmissions.map((submission) => (
            <div key={`${submission.type}-${submission.id}`} className="p-6">
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  submission.type === "leetcode" ? "bg-gt-tech-gold" : "bg-gt-gold"
                }`}>
                  {submission.type === "leetcode" ? "LC" : "GYM"}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gt-navy">
                      {submission.user.name}
                    </p>
                    <span className="text-xs text-gt-gray">
                      {new Date(submission.createdAt).toLocaleDateString()} at{" "}
                      {new Date(submission.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  
                  {submission.type === "leetcode" ? (
                    <div className="mt-2">
                      <p className="text-sm text-gt-navy">
                        Solved: <span className="font-medium">{submission.problemName}</span>
                        {submission.solvedWithHelp && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gt-tech-gold/20 text-gt-navy">
                            with help
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-sm text-gt-gray">
                        💡 {submission.learnings}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-sm text-gt-gray">
                        🏋️ {submission.workout}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}