"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Sparkles, BookOpen, GraduationCap, Briefcase, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  suggestions?: string[]
}

const quickQuestions = [
  "What career options are available after Computer Science?",
  "Which colleges offer the best Engineering programs?",
  "How do I prepare for JEE Main?",
  "What are the admission requirements for DU?",
  "Tell me about scholarship opportunities",
  "What's the difference between B.Tech and B.E.?",
]

const sampleConversation: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI Education Advisor. I'm here to help you with questions about courses, careers, colleges, and admissions. What would you like to know?",
    sender: "ai",
    timestamp: new Date(Date.now() - 300000),
    suggestions: ["Tell me about engineering careers", "What colleges are near me?", "How to choose the right stream?"],
  },
]

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>(sampleConversation)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("engineering") || lowerMessage.includes("computer science")) {
      return "Engineering is a fantastic field with diverse opportunities! Computer Science Engineering offers careers in software development, data science, AI/ML, cybersecurity, and more. The average starting salary ranges from ₹6-15 LPA. Popular colleges include IITs, NITs, and BITS Pilani. Would you like to know about specific specializations or admission requirements?"
    }

    if (lowerMessage.includes("college") || lowerMessage.includes("admission")) {
      return "For college admissions, the process varies by stream. For Engineering, you'll need to clear JEE Main/Advanced. For Medical, NEET is mandatory. For Arts/Commerce, most colleges consider Class 12 marks. Key factors to consider: location, fees, placement records, and faculty. Would you like information about specific colleges or admission processes?"
    }

    if (lowerMessage.includes("career") || lowerMessage.includes("job")) {
      return "Career choices depend on your interests and strengths! Based on our quiz system, we can recommend suitable paths. Popular career tracks include: Technology (Software, Data Science), Healthcare (Medicine, Nursing), Business (Management, Finance), and Creative fields (Design, Media). Each has different educational requirements and growth prospects. What interests you most?"
    }

    if (lowerMessage.includes("scholarship")) {
      return "There are numerous scholarship opportunities available! Government scholarships include National Scholarship Portal, Merit-cum-Means scholarships, and state-specific programs. Private scholarships are offered by companies like Tata, Reliance, and educational institutions. Eligibility typically depends on academic performance, family income, and category. The amounts range from ₹25,000 to ₹2,00,000 annually. Would you like help finding scholarships for your specific situation?"
    }

    if (lowerMessage.includes("stream") || lowerMessage.includes("choose")) {
      return "Choosing the right stream is crucial for your future! Science stream is ideal if you enjoy problem-solving and want careers in engineering, medicine, or research. Commerce suits those interested in business, finance, and economics. Arts/Humanities is perfect for creative minds interested in literature, social sciences, and liberal arts. Our aptitude quiz can help you make an informed decision. Have you taken our quiz yet?"
    }

    return "That's a great question! I'd be happy to help you with information about courses, careers, colleges, and admissions. Could you be more specific about what you'd like to know? For example, are you interested in a particular field of study, specific colleges, or career guidance?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
        suggestions: [
          "Tell me more about this",
          "What are the requirements?",
          "Show me related colleges",
          "What about career prospects?",
        ],
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    inputRef.current?.focus()
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              AI Education Advisor
            </h1>
            <p className="text-muted-foreground">Get instant answers about courses, careers, and colleges</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </Badge>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
                <CardDescription>Click to ask common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-3 text-wrap"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{question}</span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>College Admissions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>Career Guidance</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Course Selection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Scholarships</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="border-border h-full flex flex-col">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">EduGuide AI Assistant</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Online and ready to help
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn("flex gap-3", message.sender === "user" ? "justify-end" : "justify-start")}
                      >
                        {message.sender === "ai" && (
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        )}

                        <div
                          className={cn(
                            "max-w-[80%] space-y-2",
                            message.sender === "user" ? "items-end" : "items-start",
                          )}
                        >
                          <div
                            className={cn(
                              "rounded-lg px-4 py-2 text-sm",
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-muted text-foreground",
                            )}
                          >
                            {message.content}
                          </div>

                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>

                          {message.suggestions && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-6 px-2 bg-transparent"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>

                        {message.sender === "user" && (
                          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-secondary-foreground" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="bg-muted rounded-lg px-4 py-2 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about courses, careers, or colleges..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
