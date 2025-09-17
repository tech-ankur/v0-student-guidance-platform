"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Users, BookOpen, Filter, ChevronLeft, ChevronRight } from "lucide-react"

const colleges = [
  {
    id: 1,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    distance: "15 km",
    type: "Government",
    courses: ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
    cutoff: "JEE Advanced Rank 1-500",
    rating: 4.8,
    students: "8,000+",
    fees: "₹2.5L/year",
    facilities: ["Hostel", "Library", "Sports Complex", "Labs"],
    image: "/iit-delhi-campus.jpg",
  },
  {
    id: 2,
    name: "Delhi University - St. Stephen's College",
    location: "New Delhi, Delhi",
    distance: "12 km",
    type: "Government",
    courses: ["Economics", "English Literature", "History", "Philosophy"],
    cutoff: "95%+ in Class 12",
    rating: 4.7,
    students: "1,500+",
    fees: "₹50K/year",
    facilities: ["Hostel", "Library", "Auditorium", "Sports"],
    image: "/st-stephen-s-college-delhi.jpg",
  },
  {
    id: 3,
    name: "Shri Ram College of Commerce",
    location: "New Delhi, Delhi",
    distance: "18 km",
    type: "Government",
    courses: ["B.Com (Hons)", "Economics (Hons)", "Business Economics"],
    cutoff: "98%+ in Class 12",
    rating: 4.6,
    students: "2,000+",
    fees: "₹45K/year",
    facilities: ["Library", "Computer Lab", "Auditorium", "Cafeteria"],
    image: "/srcc-delhi-campus.jpg",
  },
  {
    id: 4,
    name: "Jamia Millia Islamia",
    location: "New Delhi, Delhi",
    distance: "25 km",
    type: "Central University",
    courses: ["Mass Communication", "Architecture", "Engineering", "Management"],
    cutoff: "JEE Main Rank 10,000+",
    rating: 4.4,
    students: "15,000+",
    fees: "₹1.2L/year",
    facilities: ["Hostel", "Library", "Medical Center", "Sports Complex"],
    image: "/jamia-millia-islamia-campus.jpg",
  },
  {
    id: 5,
    name: "Guru Gobind Singh Indraprastha University",
    location: "New Delhi, Delhi",
    distance: "22 km",
    type: "State University",
    courses: ["B.Tech", "MBA", "Law", "Medical"],
    cutoff: "JEE Main Rank 15,000+",
    rating: 4.3,
    students: "20,000+",
    fees: "₹1.8L/year",
    facilities: ["Multiple Campuses", "Research Centers", "Industry Partnerships"],
    image: "/ggsipu-campus-delhi.jpg",
  },
  {
    id: 6,
    name: "Lady Shri Ram College",
    location: "New Delhi, Delhi",
    distance: "16 km",
    type: "Government",
    courses: ["Psychology", "Political Science", "Sociology", "Economics"],
    cutoff: "96%+ in Class 12",
    rating: 4.5,
    students: "1,200+",
    fees: "₹40K/year",
    facilities: ["Library", "Psychology Lab", "Auditorium", "Sports"],
    image: "/lady-shri-ram-college-delhi.jpg",
  },
]

const courseOptions = [
  "Computer Science",
  "Mechanical Engineering",
  "Economics",
  "English Literature",
  "B.Com (Hons)",
  "Mass Communication",
  "Psychology",
  "Law",
  "Medical",
]

const facilityOptions = ["Hostel", "Library", "Sports Complex", "Labs", "Auditorium", "Medical Center"]

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [distanceFilter, setDistanceFilter] = useState("any")
  const [typeFilter, setTypeFilter] = useState("any")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const itemsPerPage = 4

  // Filter colleges based on search and filters
  const filteredColleges = colleges.filter((college) => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCourses =
      selectedCourses.length === 0 || selectedCourses.some((course) => college.courses.includes(course))

    const matchesFacilities =
      selectedFacilities.length === 0 || selectedFacilities.every((facility) => college.facilities.includes(facility))

    const matchesType = typeFilter === "any" || college.type === typeFilter

    const matchesDistance =
      distanceFilter === "any" ||
      (distanceFilter === "10" && Number.parseInt(college.distance) <= 10) ||
      (distanceFilter === "20" && Number.parseInt(college.distance) <= 20) ||
      (distanceFilter === "30" && Number.parseInt(college.distance) <= 30)

    return matchesSearch && matchesCourses && matchesFacilities && matchesType && matchesDistance
  })

  // Pagination
  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedColleges = filteredColleges.slice(startIndex, startIndex + itemsPerPage)

  const handleCourseChange = (course: string, checked: boolean) => {
    if (checked) {
      setSelectedCourses([...selectedCourses, course])
    } else {
      setSelectedCourses(selectedCourses.filter((c) => c !== course))
    }
    setCurrentPage(1)
  }

  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      setSelectedFacilities([...selectedFacilities, facility])
    } else {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility))
    }
    setCurrentPage(1)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">College Directory</h1>
            <p className="text-muted-foreground">Discover the perfect college for your academic journey</p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search colleges, courses, or locations..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Distance Filter */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Distance</h3>
                  <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any distance</SelectItem>
                      <SelectItem value="10">Within 10 km</SelectItem>
                      <SelectItem value="20">Within 20 km</SelectItem>
                      <SelectItem value="30">Within 30 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Type Filter */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">College Type</h3>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any type</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Central University">Central University</SelectItem>
                      <SelectItem value="State University">State University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Course Filter */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Courses</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {courseOptions.map((course) => (
                      <div key={course} className="flex items-center space-x-2">
                        <Checkbox
                          id={course}
                          checked={selectedCourses.includes(course)}
                          onCheckedChange={(checked) => handleCourseChange(course, checked as boolean)}
                        />
                        <label htmlFor={course} className="text-sm text-foreground cursor-pointer">
                          {course}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Facilities Filter */}
                <div>
                  <h3 className="font-medium text-foreground mb-3">Facilities</h3>
                  <div className="space-y-2">
                    {facilityOptions.map((facility) => (
                      <div key={facility} className="flex items-center space-x-2">
                        <Checkbox
                          id={facility}
                          checked={selectedFacilities.includes(facility)}
                          onCheckedChange={(checked) => handleFacilityChange(facility, checked as boolean)}
                        />
                        <label htmlFor={facility} className="text-sm text-foreground cursor-pointer">
                          {facility}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* College List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredColleges.length)} of{" "}
                {filteredColleges.length} colleges
              </p>
            </div>

            {/* College Cards */}
            <div className="space-y-4">
              {paginatedColleges.map((college) => (
                <Card key={college.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* College Image */}
                      <div className="md:col-span-1">
                        <img
                          src={college.image || "/placeholder.svg"}
                          alt={college.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* College Info */}
                      <div className="md:col-span-2 space-y-3">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{college.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4" />
                            <span>{college.location}</span>
                            <span>•</span>
                            <span>{college.distance} away</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{college.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{college.students}</span>
                          </div>
                          <Badge variant="outline">{college.type}</Badge>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Available Courses</h4>
                          <div className="flex flex-wrap gap-1">
                            {college.courses.slice(0, 3).map((course) => (
                              <Badge key={course} variant="secondary" className="text-xs">
                                {course}
                              </Badge>
                            ))}
                            {college.courses.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{college.courses.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Facilities</h4>
                          <div className="flex flex-wrap gap-1">
                            {college.facilities.slice(0, 4).map((facility) => (
                              <Badge key={facility} variant="outline" className="text-xs">
                                {facility}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* College Stats */}
                      <div className="md:col-span-1 space-y-4">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Cutoff</p>
                          <p className="text-sm font-medium text-foreground">{college.cutoff}</p>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Fees</p>
                          <p className="text-sm font-medium text-foreground">{college.fees}</p>
                        </div>
                        <Button className="w-full" size="sm">
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
