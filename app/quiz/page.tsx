"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const quizQuestions = [
  {
    id: 1,
    question: "Which subject do you find most interesting?",
    options: [
      { id: "a", text: "Mathematics and Physics", stream: "science" },
      { id: "b", text: "History and Literature", stream: "arts" },
      { id: "c", text: "Economics and Business Studies", stream: "commerce" },
      { id: "d", text: "Biology and Chemistry", stream: "science" },
    ],
  },
  {
    id: 2,
    question: "What type of activities do you enjoy most?",
    options: [
      { id: "a", text: "Solving complex problems and puzzles", stream: "science" },
      { id: "b", text: "Creative writing and artistic expression", stream: "arts" },
      { id: "c", text: "Managing projects and organizing events", stream: "commerce" },
      { id: "d", text: "Conducting experiments and research", stream: "science" },
    ],
  },
  {
    id: 3,
    question: "Which career path appeals to you most?",
    options: [
      { id: "a", text: "Engineer or Software Developer", stream: "science" },
      { id: "b", text: "Teacher or Social Worker", stream: "arts" },
      { id: "c", text: "Business Manager or Entrepreneur", stream: "commerce" },
      { id: "d", text: "Doctor or Research Scientist", stream: "science" },
    ],
  },
  {
    id: 4,
    question: "How do you prefer to learn new concepts?",
    options: [
      { id: "a", text: "Through practical experiments and hands-on work", stream: "science" },
      { id: "b", text: "Through discussions and group activities", stream: "arts" },
      { id: "c", text: "Through case studies and real-world examples", stream: "commerce" },
      { id: "d", text: "Through theoretical analysis and research", stream: "science" },
    ],
  },
  {
    id: 5,
    question: "What motivates you the most?",
    options: [
      { id: "a", text: "Discovering how things work", stream: "science" },
      { id: "b", text: "Helping others and making a difference", stream: "arts" },
      { id: "c", text: "Building successful businesses", stream: "commerce" },
      { id: "d", text: "Contributing to scientific knowledge", stream: "science" },
    ],
  },
]

const streamResults = {
  science: {
    title: "Science Stream",
    description:
      "You have a strong aptitude for logical thinking, problem-solving, and analytical skills. Science stream would be perfect for you!",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    careers: ["Engineering", "Medicine", "Research", "Technology", "Architecture"],
    color: "bg-blue-500",
  },
  commerce: {
    title: "Commerce Stream",
    description:
      "You show excellent business acumen and interest in economic activities. Commerce stream aligns well with your interests!",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    careers: ["Business Management", "Finance", "Entrepreneurship", "Banking", "Marketing"],
    color: "bg-green-500",
  },
  arts: {
    title: "Arts/Humanities Stream",
    description:
      "You have strong communication skills and interest in human behavior and society. Arts stream would suit you well!",
    subjects: ["History", "Political Science", "Psychology", "Literature", "Sociology"],
    careers: ["Teaching", "Social Work", "Journalism", "Law", "Civil Services"],
    color: "bg-purple-500",
  },
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [recommendedStream, setRecommendedStream] = useState<string>("")

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswerSelect = (questionId: number, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate recommended stream based on answers
    const streamCounts = { science: 0, commerce: 0, arts: 0 }

    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = quizQuestions.find((q) => q.id === Number.parseInt(questionId))
      const option = question?.options.find((o) => o.id === optionId)
      if (option) {
        streamCounts[option.stream as keyof typeof streamCounts]++
      }
    })

    const recommended = Object.entries(streamCounts).reduce((a, b) =>
      streamCounts[a[0] as keyof typeof streamCounts] > streamCounts[b[0] as keyof typeof streamCounts] ? a : b,
    )[0]

    setRecommendedStream(recommended)
    setShowResults(true)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setRecommendedStream("")
  }

  const currentQ = quizQuestions[currentQuestion]
  const isAnswered = answers[currentQ?.id] !== undefined
  const allAnswered = quizQuestions.every((q) => answers[q.id] !== undefined)

  if (showResults) {
    const result = streamResults[recommendedStream as keyof typeof streamResults]

    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Quiz Complete!</h1>
            <p className="text-muted-foreground">Based on your responses, here's our recommendation:</p>
          </div>

          <Card className="border-border">
            <CardHeader className="text-center">
              <div className={cn("w-4 h-4 rounded-full mx-auto mb-4", result.color)}></div>
              <CardTitle className="text-2xl">{result.title}</CardTitle>
              <CardDescription className="text-base">{result.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Core Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Career Opportunities</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.careers.map((career) => (
                      <Badge key={career} variant="outline">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={handleRestart} variant="outline" className="flex-1 bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button className="flex-1">Explore Career Paths</Button>
                <Button variant="secondary" className="flex-1">
                  Find Colleges
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Aptitude & Interest Quiz</h1>
          <p className="text-muted-foreground">Answer these questions to discover which stream suits you best</p>
        </div>

        {/* Progress Bar */}
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            <CardDescription>Select the option that best describes you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = answers[currentQ.id] === option.id
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(currentQ.id, option.id)}
                  className={cn(
                    "w-full p-4 text-left border rounded-lg transition-all hover:border-primary/50",
                    isSelected
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border bg-card text-card-foreground hover:bg-accent",
                  )}
                >
                  <div className="flex items-center gap-3">
                    {isSelected ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="font-medium">{option.text}</span>
                  </div>
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full",
                  index < currentQuestion ? "bg-primary" : index === currentQuestion ? "bg-primary/50" : "bg-muted",
                )}
              />
            ))}
          </div>

          {currentQuestion === quizQuestions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={!allAnswered}>
              Submit Quiz
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!isAnswered}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
