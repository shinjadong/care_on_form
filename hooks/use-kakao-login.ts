"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

declare global {
  interface Window {
    Kakao: any
  }
}

export const useKakaoLogin = () => {
  const [loading, setLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY
        if (appKey && appKey !== "your_kakao_app_key_here") {
          window.Kakao.init(appKey)
          setIsInitialized(true)
        }
      } else {
        setIsInitialized(true)
      }
    }
  }, [])

  const loginWithKakao = async () => {
    if (!isInitialized) {
      console.error("Kakao SDK가 초기화되지 않았습니다.")
      return
    }

    try {
      setLoading(true)

      // 카카오 로그인
      await new Promise((resolve, reject) => {
        window.Kakao.Auth.login({
          success: (response: any) => {
            console.log("카카오 로그인 성공:", response)
            resolve(response)
          },
          fail: (error: any) => {
            console.error("카카오 로그인 실패:", error)
            reject(error)
          },
        })
      })

      // 사용자 정보 가져오기
      const userInfo = await new Promise((resolve, reject) => {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (response: any) => {
            console.log("사용자 정보:", response)
            resolve(response)
          },
          fail: (error: any) => {
            console.error("사용자 정보 가져오기 실패:", error)
            reject(error)
          },
        })
      }) as any

      // Supabase에서 사용자 생성 또는 로그인
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `kakao_${userInfo.id}@careon.local`,
        password: `kakao_${userInfo.id}_password`,
      })

      if (error && error.message.includes("Invalid login credentials")) {
        // 계정이 없으면 생성
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: `kakao_${userInfo.id}@careon.local`,
          password: `kakao_${userInfo.id}_password`,
          options: {
            data: {
              kakao_id: userInfo.id,
              name: userInfo.properties?.nickname || "카카오 사용자",
              profile_image: userInfo.properties?.profile_image,
              provider: "kakao",
            },
          },
        })

        if (signUpError) {
          throw signUpError
        }

        return signUpData
      } else if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error("카카오 로그인 처리 중 오류:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logoutFromKakao = async () => {
    if (!isInitialized) return

    try {
      // 카카오 로그아웃
      await new Promise((resolve) => {
        window.Kakao.Auth.logout(() => {
          resolve(true)
        })
      })

      // Supabase 로그아웃
      await supabase.auth.signOut()
    } catch (error) {
      console.error("로그아웃 중 오류:", error)
    }
  }

  return {
    loginWithKakao,
    logoutFromKakao,
    loading,
    isInitialized,
  }
}