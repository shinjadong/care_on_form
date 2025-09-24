"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { CareonButton } from "@/components/ui/careon-button"
import { CareonInput } from "@/components/ui/careon-input"
import { CareonContainer } from "@/components/ui/careon-container"
import { KakaoLoginButton } from "@/components/ui/kakao-login-button"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleLogin = async () => {
    try {
      setLoading(true)
      setMessage("")

      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage("로그인 성공!")
        // 성공 시 페이지 새로고침하여 인증 상태 업데이트
        window.location.reload()
      }
    } catch (error) {
      setMessage("로그인 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async () => {
    try {
      setLoading(true)
      setMessage("")

      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage("회원가입이 완료되었습니다! 이메일을 확인해주세요.")
      }
    } catch (error) {
      setMessage("회원가입 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <CareonContainer>
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-center text-black mb-2">케어온 로그인</h1>
          <p className="text-center text-gray-600">고객 가입 시스템에 로그인하세요</p>
        </div>

        <div className="space-y-6 mb-8">
          <CareonInput
            label="이메일"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={setEmail}
            type="text"
            inputMode="email"
          />

          <CareonInput
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={setPassword}
            type="password"
          />
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            message.includes("성공") || message.includes("완료")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-3">
          <KakaoLoginButton
            onSuccess={() => {
              setMessage("카카오톡 로그인 성공!")
              window.location.reload()
            }}
            onError={() => {
              setMessage("카카오톡 로그인 중 오류가 발생했습니다.")
            }}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#fbfbfb] px-4 text-gray-500">또는</span>
            </div>
          </div>

          <CareonButton
            onClick={handleLogin}
            disabled={loading || !email || !password}
          >
            {loading ? "로그인 중..." : "이메일로 로그인"}
          </CareonButton>

          <CareonButton
            onClick={handleSignUp}
            disabled={loading || !email || !password}
            className="bg-gray-500 hover:bg-gray-600"
          >
            {loading ? "가입 중..." : "이메일로 회원가입"}
          </CareonButton>
        </div>
      </div>
    </CareonContainer>
  )
}