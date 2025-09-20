"use client"

import { useState, useRef } from "react"
import { CareonContainer } from "@/components/ui/careon-container"
import { CareonButton } from "@/components/ui/careon-button"
import { BackButton } from "@/components/ui/back-button"
import type { FormData } from "@/app/enrollment/page"

interface StepDocumentUploadProps {
  formData: FormData
  updateFormData: (field: keyof FormData, value: any) => void
  onNext: () => void
  onBack: () => void
}

interface DocumentFile {
  name: string
  file: File | null
  url: string | null
  uploading: boolean
  uploaded: boolean
}

export default function StepDocumentUpload({ formData, updateFormData, onNext, onBack }: StepDocumentUploadProps) {
  const [documents, setDocuments] = useState<DocumentFile[]>([
    { name: "사업자등록증", file: null, url: formData.businessRegistrationUrl || null, uploading: false, uploaded: !!formData.businessRegistrationUrl },
    { name: "신분증 앞면", file: null, url: formData.idCardFrontUrl || null, uploading: false, uploaded: !!formData.idCardFrontUrl },
    { name: "신분증 뒷면", file: null, url: formData.idCardBackUrl || null, uploading: false, uploaded: !!formData.idCardBackUrl },
    { name: "통장 사본", file: null, url: formData.bankbookUrl || null, uploading: false, uploaded: !!formData.bankbookUrl },
  ])

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleFileSelect = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 파일 크기 체크 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하로 해주세요.")
      return
    }

    // 파일 타입 체크
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf"]
    if (!validTypes.includes(file.type)) {
      alert("JPG, PNG, GIF, PDF 파일만 업로드 가능합니다.")
      return
    }

    // 파일 업로드 시작
    uploadFile(index, file)
  }

  const uploadFile = async (index: number, file: File) => {
    // 업로드 상태 업데이트
    setDocuments(prev => prev.map((doc, i) =>
      i === index ? { ...doc, file, uploading: true } : doc
    ))

    try {
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: 'POST',
          body: file,
        }
      )

      if (!response.ok) {
        throw new Error("업로드 실패")
      }

      const blob = await response.json()

      // 성공 상태 업데이트
      setDocuments(prev => prev.map((doc, i) =>
        i === index ? { ...doc, url: blob.url, uploading: false, uploaded: true } : doc
      ))

      // FormData 업데이트
      switch (index) {
        case 0:
          updateFormData("businessRegistrationUrl", blob.url)
          break
        case 1:
          updateFormData("idCardFrontUrl", blob.url)
          break
        case 2:
          updateFormData("idCardBackUrl", blob.url)
          break
        case 3:
          updateFormData("bankbookUrl", blob.url)
          break
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("파일 업로드에 실패했습니다. 다시 시도해주세요.")

      // 실패 상태 업데이트
      setDocuments(prev => prev.map((doc, i) =>
        i === index ? { ...doc, uploading: false } : doc
      ))
    }
  }

  const handleRemoveFile = (index: number) => {
    setDocuments(prev => prev.map((doc, i) =>
      i === index ? { ...doc, file: null, url: null, uploaded: false } : doc
    ))

    // FormData 초기화
    switch (index) {
      case 0:
        updateFormData("businessRegistrationUrl", null)
        break
      case 1:
        updateFormData("idCardFrontUrl", null)
        break
      case 2:
        updateFormData("idCardBackUrl", null)
        break
      case 3:
        updateFormData("bankbookUrl", null)
        break
    }

    // 파일 입력 초기화
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = ""
    }
  }

  const handleNext = () => {
    // 필수 서류 체크
    const requiredDocs = [0, 1, 2] // 사업자등록증, 신분증 앞면, 뒷면
    const allRequiredUploaded = requiredDocs.every(i => documents[i].uploaded)

    if (!allRequiredUploaded) {
      alert("필수 서류를 모두 업로드해주세요. (사업자등록증, 신분증 앞/뒷면)")
      return
    }

    onNext()
  }

  return (
    <CareonContainer>
      <div className="flex items-center justify-start p-4 pb-0">
        <BackButton onClick={onBack} />
      </div>
      <div className="flex-1 flex flex-col justify-start pt-12 px-6">
        <h1 className="text-2xl font-semibold text-black leading-relaxed mb-8">
          필요한 서류를<br />
          등록해주세요
        </h1>

        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">
                  {doc.name}
                  {index < 3 && <span className="text-red-500 ml-1">*</span>}
                </h3>
                {doc.uploaded && (
                  <span className="text-sm text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    업로드 완료
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  ref={el => {fileInputRefs.current[index] = el}}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileSelect(index, e)}
                  className="hidden"
                  id={`file-${index}`}
                  disabled={doc.uploading}
                />

                {!doc.uploaded ? (
                  <label
                    htmlFor={`file-${index}`}
                    className={`flex-1 text-center py-3 px-4 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
                      doc.uploading
                        ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                        : "border-gray-300 hover:border-[#009DA2] hover:bg-gray-50"
                    }`}
                  >
                    {doc.uploading ? (
                      <span className="text-gray-500">업로드 중...</span>
                    ) : (
                      <span className="text-gray-600">파일 선택</span>
                    )}
                  </label>
                ) : (
                  <div className="flex-1 flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <span className="text-sm text-gray-700 truncate">
                      {doc.file?.name || "파일 업로드됨"}
                    </span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">안내사항:</span>
          </p>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>• 파일 형식: JPG, PNG, GIF, PDF</li>
            <li>• 최대 파일 크기: 10MB</li>
            <li>• 필수 서류는 반드시 업로드해주세요</li>
          </ul>
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