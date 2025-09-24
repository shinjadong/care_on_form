"use client"

import { useAuth } from "@/contexts/auth-context"
import { CareonContainer } from "@/components/ui/careon-container"
import { CareonButton } from "@/components/ui/careon-button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/enrollment/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <CareonContainer>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#009da2] mx-auto mb-4"></div>
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      </CareonContainer>
    )
  }

  return (
    <CareonContainer>
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black mb-4">케어온</h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">고객 가입 시스템</h2>
          <p className="text-gray-600">
            케어온 사업자를 위한 9단계 고객 가입 프로세스
          </p>
        </div>

        <div className="space-y-4">
          <CareonButton onClick={() => router.push("/login")}>
            로그인
          </CareonButton>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              계정이 없으신가요? 로그인 페이지에서 회원가입할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </CareonContainer>
  )
}