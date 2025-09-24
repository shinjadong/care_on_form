"use client"

import { useAuth } from "@/contexts/auth-context"
import { CareonContainer } from "@/components/ui/careon-container"
import { CareonButton } from "@/components/ui/careon-button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
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

  if (!user) {
    return (
      <CareonContainer>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-6">
              케어온 고객 가입 시스템을 사용하려면 로그인해주세요.
            </p>
            <CareonButton onClick={() => router.push("/login")}>
              로그인 하러 가기
            </CareonButton>
          </div>
        </div>
      </CareonContainer>
    )
  }

  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
          {user.user_metadata?.name && (
            <span className="text-sm text-gray-800 font-medium">
              {user.user_metadata.name}
            </span>
          )}
          <span className="text-xs text-gray-500">
            {user.user_metadata?.provider === 'kakao' ? '카카오' : user.email}
          </span>
          <button
            onClick={signOut}
            className="text-xs text-red-500 hover:text-red-700 ml-1"
          >
            로그아웃
          </button>
        </div>
      </div>
      {children}
    </>
  )
}