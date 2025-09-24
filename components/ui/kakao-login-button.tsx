"use client"

import { useKakaoLogin } from "@/hooks/use-kakao-login"
import { cn } from "@/lib/utils"

interface KakaoLoginButtonProps {
  className?: string
  onSuccess?: () => void
  onError?: (error: any) => void
}

export function KakaoLoginButton({ className, onSuccess, onError }: KakaoLoginButtonProps) {
  const { loginWithKakao, loading, isInitialized } = useKakaoLogin()

  const handleLogin = async () => {
    try {
      await loginWithKakao()
      onSuccess?.()
    } catch (error) {
      onError?.(error)
    }
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading || !isInitialized}
      className={cn(
        "w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        "bg-[#FEE500] hover:bg-[#FFEB3B] text-[#000000] border border-[#FEE500]",
        "flex items-center justify-center gap-3",
        className,
      )}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#000000]"></div>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 0C4.0374 0 0 3.11571 0 6.9706C0 9.22059 1.41176 11.2353 3.52941 12.4412C3.42353 12.9 3.15294 13.8 2.97647 14.4C2.8 15 3.03529 15.1765 3.49412 14.9118C4.48235 14.3647 6.01176 13.5 6.74118 13.0588C7.47059 13.1647 8.22353 13.2353 9 13.2353C13.9626 13.2353 18 10.1196 18 6.26471C18 2.40981 13.9626 0 9 0Z"
            fill="#000000"
          />
        </svg>
      )}
      {loading ? "카카오톡 로그인 중..." : "카카오톡으로 간편 로그인"}
    </button>
  )
}