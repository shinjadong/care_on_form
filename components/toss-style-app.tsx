"use client"

import { useState, useRef } from "react"
import { TossContainer } from "./ui/toss-container"
import { TossButton } from "./ui/toss-button"
import { TossInput } from "./ui/toss-input"
import { IOSCarrierSelect } from "./ui/ios-carrier-select"
import { PandaImage } from "./ui/pandaimage"
import { BackButton } from "./ui/back-button" // Added BackButton import

const steps = [
  {
    id: 1,
    title: "케어온은\n사장님을 생각해요",
    buttonText: "시작하기",
    icon: "shield",
  },
  {
    id: 2,
    title: "본인 인증을 위해\n먼저 이름을 알려주세요",
    buttonText: "다음",
    icon: null,
  },
  {
    id: 3,
    title: "주민등록번호를\n입력해주세요",
    buttonText: "다음",
    icon: null,
  },
  {
    id: 4,
    title: "통신사를\n선택해주세요",
    buttonText: "다음",
    icon: null,
  },
  {
    id: 5,
    title: "휴대폰 번호를\n입력해주세요",
    buttonText: "완료",
    icon: null,
  },
  {
    id: 6,
    title: "가입이 완료되었습니다!",
    buttonText: "시작하기",
    icon: "check",
  },
]

export function TossStyleApp() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    idNumber1: "",
    idNumber2: "",
    phoneNumber: "",
    carrier: "",
  })

  const currentStepData = steps.find((step) => step.id === currentStep)

  const handleNext = () => {
    if (currentStep === 6) {
      setCurrentStep(1)
      setFormData({
        name: "",
        idNumber1: "",
        idNumber2: "",
        phoneNumber: "",
        carrier: "",
      })
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const idNumber2Ref = useRef<HTMLInputElement>(null)

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "idNumber1" && value.length === 6) {
      setTimeout(() => {
        idNumber2Ref.current?.focus()
      }, 0)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 2:
        return formData.name.trim() !== ""
      case 3:
        return formData.idNumber1.length === 6 && formData.idNumber2.length === 7
      case 4:
        return formData.carrier !== ""
      case 5:
        return formData.phoneNumber.length >= 10
      default:
        return true
    }
  }

  return (
    <TossContainer>
      {currentStep > 1 && currentStep < 6 && (
        <div className="flex items-center justify-start p-4 pb-0">
          <BackButton onClick={handleBack} />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-start pt-16 px-6">
        {/* Icon */}
        {currentStepData?.icon && (
          <div className="mb-8">
            <PandaImage type={currentStepData.icon} />
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-semibold text-black leading-relaxed mb-10 whitespace-pre-line text-balance">
          {currentStepData?.title}
        </h1>

        {/* Form Fields */}
        {currentStep === 2 && (
          <div className="mb-10">
            <TossInput
              label="이름"
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={(value) => updateFormData("name", value)}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="mb-10">
            <label className="block text-base font-medium text-black mb-3">주민등록번호</label>
            <div className="flex gap-3">
              <TossInput
                placeholder="앞 6자리"
                value={formData.idNumber1}
                onChange={(value) => updateFormData("idNumber1", value)}
                maxLength={6}
                inputMode="numeric"
              />
              <TossInput
                ref={idNumber2Ref}
                placeholder="뒤 7자리"
                value={formData.idNumber2}
                onChange={(value) => updateFormData("idNumber2", value)}
                maxLength={7}
                type="password"
                inputMode="numeric"
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="mb-10">
            <label className="block text-base font-medium text-black mb-3">통신사</label>
            <IOSCarrierSelect value={formData.carrier} onChange={(value) => updateFormData("carrier", value)} />
          </div>
        )}

        {currentStep === 5 && (
          <div className="mb-10">
            <TossInput
              label="휴대폰 번호"
              placeholder="휴대폰 번호를 입력해주세요"
              value={formData.phoneNumber}
              onChange={(value) => updateFormData("phoneNumber", value)}
              type="tel"
            />
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-6 pt-0">
        <TossButton onClick={handleNext} variant={currentStep === 1 ? "blue" : "teal"} disabled={!isStepValid()}>
          {currentStepData?.buttonText}
        </TossButton>
      </div>
    </TossContainer>
  )
}
