"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Bell, BookOpen, DollarSign, FileText, Plus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const timelineEvents = [
  {
    id: 1,
    title: "JEE Main Registration Opens",
    type: "entrance",
    date: "2024-12-01",
    deadline: "2024-12-31",
    description: "Registration for JEE Main 2025 Session 1",
    priority: "high",
    status: "upcoming",
    category: "Engineering",
    link: "https://jeemain.nta.nic.in",
  },
  {
    id: 2,
    title: "NEET Application Form",
    type: "entrance",
    date: "2024-12-15",
    deadline: "2025-01-15",
    description: "NEET 2025 application form submission",
    priority: "high",
    status: "upcoming",
    category: "Medical",
    link: "https://neet.nta.nic.in",
  },
  {
    id: 3,
    title: "DU Admission Process",
    type: "admission",
    date: "2025-05-01",
    deadline: "2025-06-30",
    description: "Delhi University undergraduate admission process",
    priority: "medium",
    status: "upcoming",
    category: "Arts/Commerce",
    link: "https://du.ac.in",
  },
  {
    id: 4,
    title: "National Scholarship Portal",
    type: "scholarship",
    date: "2024-10-01",
    deadline: "2024-12-31",
    description: "Apply for various government scholarships",
    priority: "medium",
    status: "active",
    category: "General",
    amount: "₹50,000 - ₹2,00,000",
  },
  {
    id: 5,
    title: "JEE Advanced Registration",
    type: "entrance",
    date: "2025-05-01",
    deadline: "2025-05-15",
    description: "Registration for JEE Advanced 2025",
    priority: "high",
    status: "upcoming",
    category: "Engineering",
    prerequisite: "JEE Main qualification required",
  },
  {
    id: 6,
    title: "CLAT Registration",
    type: "entrance",
    date: "2024-12-01",
    deadline: "2025-01-31",
    description: "Common Law Admission Test registration",
    priority: "medium",
    status: "upcoming",
    category: "Law",
    link: "https://consortiumofnlus.ac.in",
  },
  {
    id: 7,
    title: "Merit Scholarship for Class 12",
    type: "scholarship",
    date: "2024-11-01",
    deadline: "2024-12-15",
    description: "State government merit scholarship",
    priority: "low",
    status: "active",
    category: "General",
    amount: "₹25,000",
  },
  {
    id: 8,
    title: "IIT Bombay Admission",
    type: "admission",
    date: "2025-06-01",
    deadline: "2025-07-15",
    description: "IIT Bombay B.Tech admission process",
    priority: "high",
    status: "upcoming",
    category: "Engineering",
    prerequisite: "JEE Advanced qualification",
  },
]

const eventTypes = {
  entrance: { label: "Entrance Exams", color: "bg-blue-500", icon: FileText },
  admission: { label: "Admissions", color: "bg-green-500", icon: BookOpen },
  scholarship: { label: "Scholarships", color: "bg-yellow-500", icon: DollarSign },
}

const priorityColors = {
  high: "border-red-500 bg-red-50",
  medium: "border-yellow-500 bg-yellow-50",
  low: "border-green-500 bg-green-50",
}

export default function TimelinePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list")

  const filteredEvents = timelineEvents.filter((event) => {
    if (selectedFilter === "all") return true
    return event.type === selectedFilter
  })

  const upcomingEvents = filteredEvents
    .filter((event) => new Date(event.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())

  const getEventsByDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return timelineEvents.filter((event) => event.date === dateStr || event.deadline === dateStr)
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Timeline Tracker</h1>
            <p className="text-muted-foreground">Stay on top of important deadlines and never miss an opportunity</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "calendar" | "list")}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="text-sm border border-border rounded-md px-2 py-1 bg-background"
              >
                <option value="all">All Events</option>
                <option value="entrance">Entrance Exams</option>
                <option value="admission">Admissions</option>
                <option value="scholarship">Scholarships</option>
              </select>
            </div>
          </div>

          <TabsContent value="list" className="space-y-6 mt-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(eventTypes).map(([type, config]) => {
                const count = timelineEvents.filter((event) => event.type === type).length
                const IconComponent = config.icon
                return (
                  <Card key={type} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.color)}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{count}</p>
                          <p className="text-sm text-muted-foreground">{config.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Deadlines</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => {
                  const daysLeft = getDaysUntilDeadline(event.deadline)
                  const eventType = eventTypes[event.type as keyof typeof eventTypes]
                  const IconComponent = eventType.icon

                  return (
                    <Card
                      key={event.id}
                      className={cn(
                        "border-l-4 transition-shadow hover:shadow-md",
                        priorityColors[event.priority as keyof typeof priorityColors],
                      )}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div
                              className={cn("w-10 h-10 rounded-lg flex items-center justify-center", eventType.color)}
                            >
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                                <Badge variant="outline">{event.category}</Badge>
                                {event.priority === "high" && <Badge variant="destructive">High Priority</Badge>}
                              </div>
                              <p className="text-muted-foreground mb-3">{event.description}</p>

                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                  <span>Deadline: {new Date(event.deadline).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span
                                    className={cn(
                                      daysLeft <= 7
                                        ? "text-red-600 font-medium"
                                        : daysLeft <= 30
                                          ? "text-yellow-600"
                                          : "text-muted-foreground",
                                    )}
                                  >
                                    {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                                  </span>
                                </div>
                                {event.amount && (
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4 text-green-600" />
                                    <span className="text-green-600 font-medium">{event.amount}</span>
                                  </div>
                                )}
                              </div>

                              {event.prerequisite && (
                                <div className="mt-2">
                                  <Badge variant="secondary" className="text-xs">
                                    Prerequisite: {event.prerequisite}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button size="sm">Apply Now</Button>
                            <Button size="sm" variant="outline">
                              <Bell className="h-4 w-4 mr-1" />
                              Remind Me
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Event Calendar</CardTitle>
                    <CardDescription>Click on a date to see events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border border-border"
                      modifiers={{
                        hasEvents: (date) => getEventsByDate(date).length > 0,
                      }}
                      modifiersStyles={{
                        hasEvents: { backgroundColor: "hsl(var(--primary))", color: "white" },
                      }}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Selected Date Events */}
              <div className="lg:col-span-1">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>{selectedDate ? selectedDate.toLocaleDateString() : "Select a Date"}</CardTitle>
                    <CardDescription>Events for selected date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedDate ? (
                      <div className="space-y-3">
                        {getEventsByDate(selectedDate).length > 0 ? (
                          getEventsByDate(selectedDate).map((event) => {
                            const eventType = eventTypes[event.type as keyof typeof eventTypes]
                            const IconComponent = eventType.icon
                            return (
                              <div key={event.id} className="p-3 border border-border rounded-lg">
                                <div className="flex items-start gap-2">
                                  <div
                                    className={cn("w-6 h-6 rounded flex items-center justify-center", eventType.color)}
                                  >
                                    <IconComponent className="h-3 w-3 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                                    <Badge variant="outline" className="text-xs mt-2">
                                      {event.category}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        ) : (
                          <p className="text-sm text-muted-foreground">No events on this date</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Select a date to view events</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
