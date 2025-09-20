"use client"

// Customer enrollment form
import { useState } from "react"
import StepOwnerInfo from "@/components/enrollment/step-1-owner-info"
import StepContactBusiness from "@/components/enrollment/step-2-contact-business"
import StepStoreInfo from "@/components/enrollment/step-3-store-info"
import StepApplicationType from "@/components/enrollment/step-4-application-type"
import StepBusinessType from "@/components/enrollment/step-5-business-type"
import StepOwnershipType from "@/components/enrollment/step-6-ownership-type"
import StepLicenseType from "@/components/enrollment/step-7-license-type"
import StepBusinessCategory from "@/components/enrollment/step-8-business-category"
import StepConfirmation from "@/components/enrollment/step-9-confirmation"

export type FormData = {
  // Step 1 - 대표자 정보
  ownerName: string
  birthDate: string
  birthGender: string

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

  // Step 5 - 사업자 형태
  businessType: string

  // Step 6 - 대표자 구성
  ownershipType: string

  // Step 7 - 인허가 업종
  licenseType: string

  // Step 8 - 직종
  businessCategory: string
}

export default function EnrollmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    // Step 1
    ownerName: "",
    birthDate: "",
    birthGender: "",
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
    // Step 5
    businessType: "",
    // Step 6
    ownershipType: "",
    // Step 7
    licenseType: "",
    // Step 8
    businessCategory: "",
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 9) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setFormData({
      ownerName: "",
      birthDate: "",
      birthGender: "",
      phoneNumber: "",
      businessName: "",
      businessNumber: "",
      storeName: "",
      storeAddress: "",
      storePostcode: "",
      storeArea: "",
      applicationType: "",
      businessType: "",
      ownershipType: "",
      licenseType: "",
      businessCategory: "",
    })
  }

  return (
    <>
      {currentStep === 1 && (
        <StepOwnerInfo
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 2 && (
        <StepContactBusiness
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 3 && (
        <StepStoreInfo
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 4 && (
        <StepApplicationType
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 5 && (
        <StepBusinessType
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 6 && (
        <StepOwnershipType
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 7 && (
        <StepLicenseType
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 8 && (
        <StepBusinessCategory
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 9 && (
        <StepConfirmation
          formData={formData}
          onNext={handleReset}
          onBack={handleBack}
        />
      )}
    </>
  )
}