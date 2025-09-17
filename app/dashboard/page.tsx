import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, Calendar, MapPin, Bell, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">
            Here's your personalized education dashboard. Continue your journey to academic success.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nearby Colleges</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-xs text-muted-foreground">Within 50km radius</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Career Suggestions</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">2</div>
              <p className="text-xs text-muted-foreground">Pending review</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Admission</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Sept 30</div>
              <p className="text-xs text-muted-foreground">Application deadline</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">75%</div>
              <p className="text-xs text-muted-foreground">Aptitude assessment</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest interactions and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Completed Science Stream Quiz</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Viewed IIT Delhi Profile</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Asked AI about Engineering Careers</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>Based on your interests and quiz results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Computer Science Engineering</h4>
                  <Badge variant="secondary">95% Match</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Perfect fit based on your logical reasoning and math scores
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/career-paths">Explore Path</Link>
                </Button>
              </div>

              <div className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Data Science</h4>
                  <Badge variant="secondary">88% Match</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Growing field with excellent career prospects</p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/career-paths">Explore Path</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Continue where you left off or start something new</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
                <Link href="/quiz">
                  <Brain className="h-6 w-6 text-primary" />
                  <span className="text-sm">Continue Quiz</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
                <Link href="/colleges">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="text-sm">Browse Colleges</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
                <Link href="/timeline">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span className="text-sm">View Timeline</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" asChild>
                <Link href="/ai-advisor">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span className="text-sm">Ask AI Advisor</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
