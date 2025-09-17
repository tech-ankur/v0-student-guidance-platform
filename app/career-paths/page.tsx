"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  TrendingUp,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronUp,
  Code,
  Stethoscope,
  Calculator,
  Palette,
  Scale,
  Beaker,
} from "lucide-react"
import { cn } from "@/lib/utils"

const careerPaths = {
  science: [
    {
      id: "engineering",
      title: "Engineering Path",
      icon: Code,
      color: "bg-blue-500",
      description: "Technology and innovation-focused careers",
      education: [
        { level: "Class 12", subjects: ["Physics", "Chemistry", "Mathematics"], duration: "2 years" },
        {
          level: "B.Tech/B.E.",
          specializations: ["Computer Science", "Mechanical", "Electrical", "Civil"],
          duration: "4 years",
        },
        { level: "M.Tech (Optional)", specializations: ["Specialization", "Research"], duration: "2 years" },
      ],
      careers: [
        {
          title: "Software Engineer",
          salary: "₹6-15 LPA",
          growth: "High",
          description: "Develop software applications and systems",
        },
        {
          title: "Data Scientist",
          salary: "₹8-20 LPA",
          growth: "Very High",
          description: "Analyze data to drive business decisions",
        },
        {
          title: "Product Manager",
          salary: "₹12-25 LPA",
          growth: "High",
          description: "Lead product development and strategy",
        },
        {
          title: "Engineering Manager",
          salary: "₹20-40 LPA",
          growth: "High",
          description: "Manage engineering teams and projects",
        },
      ],
      examinations: ["JEE Main", "JEE Advanced", "State Engineering Exams"],
      skills: ["Problem Solving", "Analytical Thinking", "Programming", "Mathematics"],
    },
    {
      id: "medical",
      title: "Medical Path",
      icon: Stethoscope,
      color: "bg-red-500",
      description: "Healthcare and medical science careers",
      education: [
        { level: "Class 12", subjects: ["Physics", "Chemistry", "Biology"], duration: "2 years" },
        { level: "MBBS", specializations: ["General Medicine"], duration: "5.5 years" },
        { level: "MD/MS (Optional)", specializations: ["Specialization"], duration: "3 years" },
      ],
      careers: [
        {
          title: "General Physician",
          salary: "₹8-15 LPA",
          growth: "Stable",
          description: "Provide primary healthcare services",
        },
        {
          title: "Specialist Doctor",
          salary: "₹15-50 LPA",
          growth: "High",
          description: "Specialize in specific medical fields",
        },
        { title: "Surgeon", salary: "₹20-80 LPA", growth: "High", description: "Perform surgical procedures" },
        {
          title: "Medical Researcher",
          salary: "₹10-25 LPA",
          growth: "Medium",
          description: "Conduct medical research and studies",
        },
      ],
      examinations: ["NEET", "AIIMS", "State Medical Exams"],
      skills: ["Empathy", "Attention to Detail", "Communication", "Scientific Knowledge"],
    },
    {
      id: "research",
      title: "Research & Academia",
      icon: Beaker,
      color: "bg-purple-500",
      description: "Scientific research and academic careers",
      education: [
        { level: "Class 12", subjects: ["Physics", "Chemistry", "Mathematics/Biology"], duration: "2 years" },
        { level: "B.Sc.", specializations: ["Physics", "Chemistry", "Mathematics", "Biology"], duration: "3 years" },
        { level: "M.Sc.", specializations: ["Specialization"], duration: "2 years" },
        { level: "Ph.D.", specializations: ["Research"], duration: "3-5 years" },
      ],
      careers: [
        {
          title: "Research Scientist",
          salary: "₹6-20 LPA",
          growth: "Medium",
          description: "Conduct scientific research",
        },
        {
          title: "Professor",
          salary: "₹8-25 LPA",
          growth: "Stable",
          description: "Teach and research at universities",
        },
        { title: "Lab Manager", salary: "₹5-12 LPA", growth: "Medium", description: "Manage laboratory operations" },
        {
          title: "Science Writer",
          salary: "₹4-10 LPA",
          growth: "Medium",
          description: "Communicate science to the public",
        },
      ],
      examinations: ["CSIR NET", "GATE", "University Entrance Exams"],
      skills: ["Research Skills", "Critical Thinking", "Writing", "Patience"],
    },
  ],
  commerce: [
    {
      id: "business",
      title: "Business & Management",
      icon: Briefcase,
      color: "bg-green-500",
      description: "Business leadership and management careers",
      education: [
        { level: "Class 12", subjects: ["Accountancy", "Business Studies", "Economics"], duration: "2 years" },
        { level: "BBA/B.Com", specializations: ["Management", "Finance", "Marketing"], duration: "3 years" },
        { level: "MBA (Optional)", specializations: ["Specialization"], duration: "2 years" },
      ],
      careers: [
        {
          title: "Business Analyst",
          salary: "₹5-12 LPA",
          growth: "High",
          description: "Analyze business processes and data",
        },
        {
          title: "Marketing Manager",
          salary: "₹8-20 LPA",
          growth: "High",
          description: "Develop and execute marketing strategies",
        },
        {
          title: "Operations Manager",
          salary: "₹10-25 LPA",
          growth: "High",
          description: "Manage business operations",
        },
        {
          title: "CEO/Entrepreneur",
          salary: "₹25+ LPA",
          growth: "Variable",
          description: "Lead organizations or start businesses",
        },
      ],
      examinations: ["CAT", "XAT", "GMAT", "University Entrance Exams"],
      skills: ["Leadership", "Communication", "Strategic Thinking", "Problem Solving"],
    },
    {
      id: "finance",
      title: "Finance & Accounting",
      icon: Calculator,
      color: "bg-yellow-500",
      description: "Financial services and accounting careers",
      education: [
        { level: "Class 12", subjects: ["Accountancy", "Business Studies", "Economics"], duration: "2 years" },
        { level: "B.Com/BBA", specializations: ["Finance", "Accounting"], duration: "3 years" },
        { level: "CA/CMA/CS", specializations: ["Professional Certification"], duration: "3-4 years" },
      ],
      careers: [
        {
          title: "Chartered Accountant",
          salary: "₹8-25 LPA",
          growth: "High",
          description: "Provide accounting and tax services",
        },
        {
          title: "Financial Analyst",
          salary: "₹6-15 LPA",
          growth: "High",
          description: "Analyze financial data and investments",
        },
        {
          title: "Investment Banker",
          salary: "₹12-40 LPA",
          growth: "High",
          description: "Facilitate financial transactions",
        },
        {
          title: "CFO",
          salary: "₹30-80 LPA",
          growth: "High",
          description: "Lead financial strategy for organizations",
        },
      ],
      examinations: ["CA Foundation", "CMA", "CS", "FRM"],
      skills: ["Numerical Skills", "Attention to Detail", "Analytical Thinking", "Ethics"],
    },
  ],
  arts: [
    {
      id: "creative",
      title: "Creative Arts",
      icon: Palette,
      color: "bg-pink-500",
      description: "Creative and artistic career paths",
      education: [
        { level: "Class 12", subjects: ["English", "Fine Arts", "Any other subjects"], duration: "2 years" },
        { level: "BFA/BA", specializations: ["Fine Arts", "Design", "Media"], duration: "3-4 years" },
        { level: "MFA (Optional)", specializations: ["Specialization"], duration: "2 years" },
      ],
      careers: [
        {
          title: "Graphic Designer",
          salary: "₹3-8 LPA",
          growth: "Medium",
          description: "Create visual designs and graphics",
        },
        {
          title: "UI/UX Designer",
          salary: "₹5-15 LPA",
          growth: "High",
          description: "Design user interfaces and experiences",
        },
        {
          title: "Art Director",
          salary: "₹8-20 LPA",
          growth: "Medium",
          description: "Lead creative projects and teams",
        },
        {
          title: "Creative Director",
          salary: "₹15-35 LPA",
          growth: "Medium",
          description: "Oversee creative strategy and vision",
        },
      ],
      examinations: ["NIFT", "NID", "Portfolio Reviews", "University Entrance"],
      skills: ["Creativity", "Visual Skills", "Software Proficiency", "Communication"],
    },
    {
      id: "law",
      title: "Law & Legal Services",
      icon: Scale,
      color: "bg-indigo-500",
      description: "Legal profession and judicial careers",
      education: [
        { level: "Class 12", subjects: ["Any stream"], duration: "2 years" },
        { level: "LLB/BA LLB", specializations: ["Law"], duration: "3-5 years" },
        { level: "LLM (Optional)", specializations: ["Specialization"], duration: "1-2 years" },
      ],
      careers: [
        { title: "Lawyer", salary: "₹3-15 LPA", growth: "High", description: "Represent clients in legal matters" },
        {
          title: "Corporate Lawyer",
          salary: "₹8-30 LPA",
          growth: "High",
          description: "Handle corporate legal affairs",
        },
        { title: "Judge", salary: "₹10-25 LPA", growth: "Stable", description: "Preside over court proceedings" },
        {
          title: "Legal Consultant",
          salary: "₹6-20 LPA",
          growth: "Medium",
          description: "Provide legal advice to organizations",
        },
      ],
      examinations: ["CLAT", "LSAT", "State Law Entrance Exams"],
      skills: ["Analytical Skills", "Communication", "Research", "Ethics"],
    },
  ],
}

export default function CareerPathsPage() {
  const [selectedStream, setSelectedStream] = useState<keyof typeof careerPaths>("science")
  const [expandedPath, setExpandedPath] = useState<string | null>(null)

  const togglePathExpansion = (pathId: string) => {
    setExpandedPath(expandedPath === pathId ? null : pathId)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Career Path Mapping</h1>
          <p className="text-muted-foreground">
            Explore different career paths and understand the journey from education to profession
          </p>
        </div>

        {/* Stream Tabs */}
        <Tabs value={selectedStream} onValueChange={(value) => setSelectedStream(value as keyof typeof careerPaths)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="commerce">Commerce</TabsTrigger>
            <TabsTrigger value="arts">Arts/Humanities</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedStream} className="space-y-6 mt-6">
            <div className="grid gap-6">
              {careerPaths[selectedStream].map((path) => {
                const isExpanded = expandedPath === path.id
                const IconComponent = path.icon

                return (
                  <Card key={path.id} className="border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", path.color)}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{path.title}</CardTitle>
                            <CardDescription>{path.description}</CardDescription>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => togglePathExpansion(path.id)}>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="space-y-6">
                        {/* Education Path */}
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            Education Journey
                          </h3>
                          <div className="flex flex-col md:flex-row gap-4">
                            {path.education.map((edu, index) => (
                              <div key={index} className="flex-1">
                                <Card className="border-border bg-muted/30">
                                  <CardContent className="p-4">
                                    <div className="text-center">
                                      <h4 className="font-semibold text-foreground">{edu.level}</h4>
                                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                                        <Clock className="h-3 w-3" />
                                        {edu.duration}
                                      </div>
                                      <div className="mt-2 space-y-1">
                                        {edu.subjects?.map((subject) => (
                                          <Badge key={subject} variant="secondary" className="text-xs">
                                            {subject}
                                          </Badge>
                                        ))}
                                        {edu.specializations?.map((spec) => (
                                          <Badge key={spec} variant="outline" className="text-xs">
                                            {spec}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                                {index < path.education.length - 1 && (
                                  <div className="flex justify-center my-2">
                                    <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90 md:rotate-0" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Career Opportunities */}
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            Career Opportunities
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {path.careers.map((career, index) => (
                              <Card key={index} className="border-border">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-foreground">{career.title}</h4>
                                    <div className="flex items-center gap-1">
                                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                                      <span className="text-xs text-muted-foreground">{career.growth}</span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3 text-green-600" />
                                    <span className="text-sm font-medium text-green-600">{career.salary}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Key Examinations */}
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-3">Key Examinations</h3>
                            <div className="space-y-2">
                              {path.examinations.map((exam) => (
                                <Badge key={exam} variant="outline" className="mr-2">
                                  {exam}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Required Skills */}
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-3">Required Skills</h3>
                            <div className="space-y-2">
                              {path.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="mr-2">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                          <Button className="flex-1">Explore Colleges for this Path</Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Talk to Career Counselor
                          </Button>
                          <Button variant="secondary" className="flex-1">
                            View Success Stories
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
