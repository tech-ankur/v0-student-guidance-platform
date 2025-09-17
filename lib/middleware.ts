import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./auth"

export function withAuth(handler: Function, allowedRoles?: string[]) {
  return async (req: NextRequest) => {
    try {
      const token = req.headers.get("authorization")?.replace("Bearer ", "")

      if (!token) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 })
      }

      const decoded = verifyToken(token)
      if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
      }

      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
      }

      // Add user info to request
      const requestWithUser = req as NextRequest & { user: { userId: string; role: string } }
      requestWithUser.user = decoded

      return handler(requestWithUser)
    } catch (error) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }
  }
}
