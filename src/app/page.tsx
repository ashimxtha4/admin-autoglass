import React, { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import AdminSidebar from "@/components/admin"

const Page = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminSidebar />
    </Suspense>
  )
}

export default Page