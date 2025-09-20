import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')

  if (!filename) {
    return NextResponse.json(
      { error: 'Filename is required' },
      { status: 400 }
    )
  }

  // 파일 이름 정리 (특수문자 제거, 공백을 언더스코어로 변경)
  const cleanFilename = filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')

  // 타임스탬프 추가하여 유니크한 파일명 생성
  const timestamp = Date.now()
  const fileExtension = cleanFilename.split('.').pop()
  const fileNameWithoutExt = cleanFilename.replace(`.${fileExtension}`, '')
  const uniqueFilename = `careon/${fileNameWithoutExt}_${timestamp}.${fileExtension}`

  try {
    // Request body를 Blob으로 받기
    const body = await request.blob()

    // Vercel Blob에 업로드
    const blob = await put(uniqueFilename, body, {
      access: 'public',
      addRandomSuffix: false,
    })

    return NextResponse.json(blob)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}