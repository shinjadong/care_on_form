"use client"

// Customer enrollment form
import { useState } from "react"
import StepOwnerInfo from "@/components/enrollment/step-1-owner-info"
import StepWelcomeTosspay from "@/components/enrollment/step-1.5-welcome-tosspay"
import StepContactBusiness from "@/components/enrollment/step-2-contact-business"
import StepStoreInfo from "@/components/enrollment/step-3-store-info"
import StepApplicationType from "@/components/enrollment/step-4-application-type"
import StepDeliveryApp from "@/components/enrollment/step-4.5-delivery-app"
import StepBusinessType from "@/components/enrollment/step-5-business-type"
import StepOwnershipType from "@/components/enrollment/step-6-ownership-type"
import StepLicenseType from "@/components/enrollment/step-7-license-type"
import StepBusinessCategory from "@/components/enrollment/step-8-business-category"
import StepFreeService from "@/components/enrollment/step-8.5-free-service"
import StepFirstCompletion from "@/components/enrollment/step-9.5-first-completion"
import StepConfirmation from "@/components/enrollment/step-9-confirmation"

export type FormData = {
  // Step 1 - 대표자 정보
  ownerName: string
  birthDate: string
  birthGender: string

  // Step 1.5 - 토스페이 동의
  agreeTosspay: string | boolean

  // Step 2 - 연락처 & 사업자 정보
  phoneNumber: string
  businessName: string
  businessNumber: string

  // Step 3 - 매장 정보
  storeName: string
  storeAddress: string
  storePostcode: string
  storeArea: string

  // Step 4 - 신청 유형
  applicationType: string

  // Step 4.5 - 배달앱
  needDeliveryApp: string | boolean

  // Step 5 - 사업자 형태
  businessType: string

  // Step 6 - 대표자 구성
  ownershipType: string

  // Step 7 - 인허가 업종
  licenseType: string

  // Step 8 - 직종
  businessCategory: string

  // Step 8.5 - 무료 서비스
  hasInternet: string | boolean
  hasCCTV: string | boolean
  wantFreeService: string | boolean
}

export default function EnrollmentPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    // Step 1
    ownerName: "",
    birthDate: "",
    birthGender: "",
    // Step 1.5
    agreeTosspay: false,
    // Step 2
    phoneNumber: "",
    businessName: "",
    businessNumber: "",
    // Step 3
    storeName: "",
    storeAddress: "",
    storePostcode: "",
    storeArea: "",
    // Step 4
    applicationType: "",
    // Step 4.5
    needDeliveryApp: false,
    // Step 5
    businessType: "",
    // Step 6
    ownershipType: "",
    // Step 7
    licenseType: "",
    // Step 8
    businessCategory: "",
    // Step 8.5
    hasInternet: false,
    hasCCTV: false,
    wantFreeService: false,
  })

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // 스텝 컴포넌트 배열 - 순서를 쉽게 변경할 수 있음
  const stepComponents = [
    { component: StepOwnerInfo, name: "대표자 정보" },
    { component: StepWelcomeTosspay, name: "토스페이 동의" },
    { component: StepContactBusiness, name: "사업자 정보" },
    { component: StepStoreInfo, name: "매장 정보" },
    { component: StepApplicationType, name: "신청 유형" },
    { component: StepDeliveryApp, name: "배달앱 서비스" },
    { component: StepBusinessType, name: "사업자 형태" },
    { component: StepOwnershipType, name: "대표자 구성" },
    { component: StepLicenseType, name: "인허가 업종" },
    { component: StepBusinessCategory, name: "직종" },
    { component: StepFreeService, name: "무료 서비스" },
    { component: StepFirstCompletion, name: "1차 완료" },
    { component: StepConfirmation, name: "최종 확인" },
  ]

  const handleNext = () => {
    if (currentStepIndex < stepComponents.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleReset = () => {
    setCurrentStepIndex(0)
    setFormData({
      ownerName: "",
      birthDate: "",
      birthGender: "",
      agreeTosspay: false,
      phoneNumber: "",
      businessName: "",
      businessNumber: "",
      storeName: "",
      storeAddress: "",
      storePostcode: "",
      storeArea: "",
      applicationType: "",
      needDeliveryApp: false,
      businessType: "",
      ownershipType: "",
      licenseType: "",
      businessCategory: "",
      hasInternet: false,
      hasCCTV: false,
      wantFreeService: false,
    })
  }

  const CurrentStep = stepComponents[currentStepIndex].component

  return (
    <CurrentStep
      formData={formData}
      updateFormData={updateFormData}
      onNext={currentStepIndex === stepComponents.length - 1 ? handleReset : handleNext}
      onBack={handleBack}
    />
  )
}