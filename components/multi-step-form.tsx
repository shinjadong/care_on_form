"use client"

import { useState } from "react"
import { TealButton } from "./ui/teal-button"
import { KoreanInput } from "./ui/korean-input"
import { Card } from "./ui/card"

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    ssn1: "",
    ssn2: "",
    phone: "",
    carrier: "",
  })

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        {currentStep === 1 && (
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-bold text-foreground">스타트 케어를 시작해보세요</h1>
            <TealButton onClick={handleNext} className="w-full">
              시작하기
            </TealButton>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-foreground">
              본인 인증을 위해 먼저 이름을 알려주세요
            </h2>
            <KoreanInput
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={(value) => handleInputChange("name", value)}
            />
            <TealButton onClick={handleNext} className="w-full" disabled={!formData.name.trim()}>
              다음
            </TealButton>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-foreground">주민등록번호를 입력해주세요</h2>
            <div className="flex gap-2 items-center">
              <KoreanInput
                placeholder="앞 6자리"
                value={formData.ssn1}
                onChange={(value) => handleInputChange("ssn1", value)}
                maxLength={6}
                className="flex-1"
              />
              <span className="text-muted-foreground">-</span>
              <KoreanInput
                placeholder="뒤 7자리"
                value={formData.ssn2}
                onChange={(value) => handleInputChange("ssn2", value)}
                maxLength={7}
                type="password"
                className="flex-1"
              />
            </div>
            <TealButton
              onClick={handleNext}
              className="w-full"
              disabled={!formData.ssn1.trim() || !formData.ssn2.trim()}
            >
              다음
            </TealButton>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-foreground">휴대폰 번호를 입력해주세요</h2>
            <div className="space-y-4">
              <select
                className="w-full p-3 border border-input rounded-lg bg-background text-foreground"
                value={formData.carrier}
                onChange={(e) => handleInputChange("carrier", e.target.value)}
              >
                <option value="">통신사를 선택해주세요</option>
                <option value="skt">SKT</option>
                <option value="kt">KT</option>
                <option value="lg">LG U+</option>
                <option value="mvno">알뜰폰</option>
              </select>
              <KoreanInput
                placeholder="휴대폰 번호를 입력해주세요"
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value)}
                type="tel"
              />
            </div>
            <TealButton
              onClick={() => alert("가입이 완료되었습니다!")}
              className="w-full"
              disabled={!formData.phone.trim() || !formData.carrier}
            >
              완료
            </TealButton>
          </div>
        )}

        {/* Step indicator */}
        <div className="flex justify-center space-x-2 pt-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${step <= currentStep ? "bg-[rgb(0,157,162)]" : "bg-muted"}`}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}
