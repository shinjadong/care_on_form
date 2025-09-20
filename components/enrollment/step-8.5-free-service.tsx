"use client"

import { useState, useEffect } from "react"
import { CareonContainer } from "@/components/ui/careon-container"
import { CareonButton } from "@/components/ui/careon-button"
import { BackButton } from "@/components/ui/back-button"
import type { FormData } from "@/app/enrollment/page"

interface StepFreeServiceProps {
  formData: FormData
  updateFormData: (field: keyof FormData, value: string | boolean) => void
  onNext: () => void
  onBack: () => void
}

export default function StepFreeService({ formData, updateFormData, onNext, onBack }: StepFreeServiceProps) {
  const [wantFreeService, setWantFreeService] = useState<boolean>(true)
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    // 2일 후 날짜 계산
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 2)

    const updateTimer = () => {
      const now = new Date()
      const diff = endDate.getTime() - now.getTime()

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) {
          setTimeLeft(`${days}일 ${hours}시간 ${minutes}분`)
        } else if (hours > 0) {
          setTimeLeft(`${hours}시간 ${minutes}분`)
        } else {
          setTimeLeft(`${minutes}분`)
        }
      } else {
        setTimeLeft("마감됨")
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // 1분마다 업데이트

    return () => clearInterval(interval)
  }, [])

  const handleNext = () => {
    updateFormData("wantFreeService", wantFreeService)
    onNext()
  }

  // 조건부 렌더링: 인터넷이나 CCTV가 없는 경우에만 표시
  const hasInternet = formData.hasInternet === "yes" || formData.hasInternet === true
  const hasCCTV = formData.hasCCTV === "yes" || formData.hasCCTV === true

  // 둘 다 있으면 이 단계를 건너뜀
  if (hasInternet && hasCCTV) {
    useEffect(() => {
      onNext()
    }, [])
    return null
  }

  const showInternetOffer = !hasInternet
  const showCCTVOffer = !hasCCTV

  return (
    <CareonContainer>
      <div className="flex items-center justify-start p-4 pb-0">
        <BackButton onClick={onBack} />
      </div>
      <div className="flex-1 flex flex-col justify-start pt-8 px-6">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🎁</span>
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              단 100명
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">특별 혜택 안내</h2>
          <p className="text-gray-700">오늘 가입하시는 분께만!</p>
        </div>

        <h1 className="text-2xl font-semibold text-black leading-relaxed mb-8">
          {showInternetOffer && showCCTVOffer && (
            <>✨ 인터넷 + AI CCTV<br />1년 무료 ✨</>
          )}
          {showInternetOffer && !showCCTVOffer && (
            <>✨ 초고속 인터넷<br />1년 무료 ✨</>
          )}
          {!showInternetOffer && showCCTVOffer && (
            <>✨ AI CCTV<br />1년 무료 ✨</>
          )}
        </h1>

        <div className="bg-white rounded-xl border-2 border-gray-100 p-6 mb-6 shadow-sm">
          <h3 className="font-semibold mb-4">제공 혜택</h3>
          <div className="space-y-3">
            {showCCTVOffer && (
              <div className="flex items-start">
                <span className="text-2xl mr-3">📹</span>
                <div>
                  <p className="font-medium">AI 지능형 CCTV (KT) 4대</p>
                  <p className="text-sm text-gray-600">24시간 매장 보안 & AI 이상감지</p>
                </div>
              </div>
            )}
            {showInternetOffer && (
              <div className="flex items-start">
                <span className="text-2xl mr-3">🌐</span>
                <div>
                  <p className="font-medium">500M 기가라이트 초고속 인터넷</p>
                  <p className="text-sm text-gray-600">안정적인 비즈니스 인터넷</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-4 mb-8 border border-red-200">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">⏰</span>
            <p className="font-semibold text-red-700">남은 시간</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{timeLeft}</p>
          <p className="text-sm text-gray-700 mt-2">이 기회를 놓치지 마세요!</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-medium mb-3">바로 혜택 안내 받아보실까요?</h3>

          <button
            onClick={() => setWantFreeService(true)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              wantFreeService
                ? "border-[#009DA2] bg-[#009DA2]/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-medium">좋아요! 🎉</p>
                <p className="text-sm text-gray-600 mt-1">1년 무료 혜택 받을게요</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 ${
                wantFreeService
                  ? "border-[#009DA2] bg-[#009DA2]"
                  : "border-gray-300"
              }`}>
                {wantFreeService && (
                  <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </button>

          <button
            onClick={() => setWantFreeService(false)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              !wantFreeService
                ? "border-gray-400 bg-gray-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-medium text-gray-600">싫어요</p>
                <p className="text-sm text-gray-500 mt-1">혜택이 필요 없어요</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 ${
                !wantFreeService
                  ? "border-gray-400 bg-gray-400"
                  : "border-gray-300"
              }`}>
                {!wantFreeService && (
                  <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="p-6 pt-0">
        <CareonButton onClick={handleNext} variant="teal">
          다음
        </CareonButton>
      </div>
    </CareonContainer>
  )
}