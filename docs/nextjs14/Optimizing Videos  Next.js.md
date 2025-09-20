---
title: "Optimizing: Videos | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/optimizing/videos"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Recommendations and best practices for optimizing videos in your Next.js application."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [최적화](https://nextjs.org/docs/14/app/building-your-application/optimizing) 동영상

## 비디오 최적화

이 페이지에서는 Next.js 응용 프로그램에서 비디오를 사용하는 방법을 간략하게 설명하고 성능에 영향을 주지 않고 비디오 파일을 저장하고 표시하는 방법을 보여줍니다.

## 사용 및 <video><iframe>

HTML을 사용하여 페이지에 비디오를 삽입할 수 있습니다. **`<video>`** 태그를 직접 비디오 파일에 사용하고 **`<iframe>`** 외부 플랫폼 호스팅 비디오의 경우.

### <video>

The HTML [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) 태그는 자체 호스팅 또는 직접 제공되는 비디오 콘텐츠를 삽입하여 재생 및 모양을 완전히 제어할 수 있습니다.

앱/UI/비디오.jsx

```
export function Video() {

  return (

    <video width="320" height="240" controls preload="none">

      <source src="/path/to/video.mp4" type="video/mp4" />

      <track

        src="/path/to/captions.vtt"

        kind="subtitles"

        srcLang="en"

        label="English"

      />

      Your browser does not support the video tag.

    </video>

  )

}
```

### 공통 태그 속성<video>

| 속성 | 묘사 | 예제 값 |
| --- | --- | --- |
| `src` | 비디오 파일의 소스를 지정합니다. | `<video src="/path/to/video.mp4" />` |
| `width` | 비디오 플레이어의 너비를 설정합니다. | `<video width="320" />` |
| `height` | 비디오 플레이어의 높이를 설정합니다. | `<video height="240" />` |
| `controls` | 있는 경우 기본 재생 컨트롤 세트가 표시됩니다. | `<video controls />` |
| `autoPlay` | 페이지가 로드되면 자동으로 비디오 재생을 시작합니다. 참고: 자동 재생 정책은 브라우저마다 다릅니다. | `<video autoPlay />` |
| `loop` | 비디오 재생을 반복합니다. | `<video loop />` |
| `muted` | 기본적으로 오디오를 음소거합니다. 와 함께 자주 사용됩니다.`autoPlay` | `<video muted />` |
| `preload` | 비디오가 미리 로드되는 방법을 지정합니다. 값:.`none` `metadata` `auto` | `<video preload="none" />` |
| `playsInline` | iOS Safari에서 자동 재생이 작동하는 데 필요한 iOS 기기에서 인라인 재생을 활성화합니다. | `<video playsInline />` |

> **알아두면 좋은 정보**: 속성을 사용할 때 대부분의 브라우저에서 비디오가 자동으로 재생되도록 속성과 iOS 장치와의 호환성을 위한 속성도 포함하는 것이 중요합니다.`autoPlay` `muted` `playsInline`

비디오 속성의 전체 목록은 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes).

### 비디오 권장사항

- **대체 콘텐츠:** 태그를 사용할 때 비디오 재생을 지원하지 않는 브라우저의 경우 태그 내에 대체 콘텐츠를 포함합니다.`<video>`
- **Subtitles or Captions:** Include subtitles or captions for users who are deaf or hard of hearing. Utilize the [`<track>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track) tag with your elements to specify caption file sources.`<video>`
- **Accessible Controls:** Standard HTML5 video controls are recommended for keyboard navigation and screen reader compatibility. For advanced needs, consider third-party players like [react-player](https://github.com/cookpete/react-player) or [video.js](https://videojs.com/), which offer accessible controls and consistent browser experience.

### <iframe>

The HTML tag allows you to embed videos from external platforms like YouTube or Vimeo.`<iframe>`

app/page.jsx

```
export default function Page() {

  return (

    <iframe

      src="https://www.youtube.com/watch?v=gfU1iZnjRZM"

      frameborder="0"

      allowfullscreen

    />

  )

}
```

### Common tag attributes<iframe>

| Attribute | Description | Example Value |
| --- | --- | --- |
| `src` | The URL of the page to embed. | `<iframe src="https://example.com" />` |
| `width` | Sets the width of the iframe. | `<iframe width="500" />` |
| `height` | Sets the height of the iframe. | `<iframe height="300" />` |
| `frameborder` | Specifies whether or not to display a border around the iframe. | `<iframe frameborder="0" />` |
| `allowfullscreen` | Allows the iframe content to be displayed in full-screen mode. | `<iframe allowfullscreen />` |
| `sandbox` | Enables an extra set of restrictions on the content within the iframe. | `<iframe sandbox />` |
| `loading` | Optimize loading behavior (e.g., lazy loading). | `<iframe loading="lazy" />` |
| `title` | Provides a title for the iframe to support accessibility. | `<iframe title="Description" />` |

For a comprehensive list of iframe attributes, refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attributes).

### Choosing a video embedding method

There are two ways you can embed videos in your Next.js application:

- **Self-hosted or direct video files:** Embed self-hosted videos using the tag for scenarios requiring detailed control over the player's functionality and appearance. This integration method within Next.js allows for customization and control of your video content.`<video>`
- **Using video hosting services (YouTube, Vimeo, etc.):** For video hosting services like YouTube or Vimeo, you'll embed their iframe-based players using the tag. While this method limits some control over the player, it offers ease of use and features provided by these platforms.`<iframe>`

Choose the embedding method that aligns with your application's requirements and the user experience you aim to deliver.

### Embedding externally hosted videos

To embed videos from external platforms, you can use Next.js to fetch the video information and React Suspense to handle the fallback state while loading.

**1\. Create a Server Component for video embedding**

The first step is to create a [Server Component](https://nextjs.org/docs/app/building-your-application/rendering/server-components) that generates the appropriate iframe for embedding the video. This component will fetch the source URL for the video and render the iframe.

app/ui/video-component.jsx

```
export default async function VideoComponent() {

  const src = await getVideoSrc()

 

  return <iframe src={src} frameborder="0" allowfullscreen />

}
```

**2\. Stream the video component using React Suspense**

After creating the Server Component to embed the video, the next step is to [stream](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) the component using [React Suspense](https://react.dev/reference/react/Suspense).

app/page.jsx

```
import { Suspense } from 'react'

import VideoComponent from '../ui/VideoComponent.jsx'

 

export default function Page() {

  return (

    <section>

      <Suspense fallback={<p>Loading video...</p>}>

        <VideoComponent />

      </Suspense>

      {/* Other content of the page */}

    </section>

  )

}
```

> **Good to know**: When embedding videos from external platforms, consider the following best practices:
> 
> - Ensure the video embeds are responsive. Use CSS to make the iframe or video player adapt to different screen sizes.
> - Implement [strategies for loading videos](https://yoast.com/site-speed-tips-for-faster-video/) based on network conditions, especially for users with limited data plans.

This approach results in a better user experience as it prevents the page from blocking, meaning the user can interact with the page while the video component streams in.

For a more engaging and informative loading experience, consider using a loading skeleton as the fallback UI. So instead of showing a simple loading message, you can show a skeleton that resembles the video player like this:

app/page.jsx

```
import { Suspense } from 'react'

import VideoComponent from '../ui/VideoComponent.jsx'

import VideoSkeleton from '../ui/VideoSkeleton.jsx'

 

export default function Page() {

  return (

    <section>

      <Suspense fallback={<VideoSkeleton />}>

        <VideoComponent />

      </Suspense>

      {/* Other content of the page */}

    </section>

  )

}
```

## Self-hosted videos

Self-hosting videos may be preferable for several reasons:

- **Complete control and independence**: Self-hosting gives you direct management over your video content, from playback to appearance, ensuring full ownership and control, free from external platform constraints.
- **Customization for specific needs**: Ideal for unique requirements, like dynamic background videos, it allows for tailored customization to align with design and functional needs.
- **Performance and scalability considerations**: Choose storage solutions that are both high-performing and scalable, to support increasing traffic and content size effectively.
- **Cost and integration**: Balance the costs of storage and bandwidth with the need for easy integration into your Next.js framework and broader tech ecosystem.

### Using Vercel Blob for video hosting

[Vercel Blob](https://vercel.com/docs/storage/vercel-blob?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) offers an efficient way to host videos, providing a scalable cloud storage solution that works well with Next.js. Here's how you can host a video using Vercel Blob:

**1\. Uploading a video to Vercel Blob**

In your Vercel dashboard, navigate to the "Storage" tab and select your [Vercel Blob](https://vercel.com/docs/storage/vercel-blob?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) store. In the Blob table's upper-right corner, find and click the "Upload" button. Then, choose the video file you wish to upload. After the upload completes, the video file will appear in the Blob table.

Alternatively, you can upload your video using a server action. For detailed instructions, refer to the Vercel documentation on [server-side uploads](https://vercel.com/docs/storage/vercel-blob/server-upload). Vercel also supports [client-side uploads](https://vercel.com/docs/storage/vercel-blob/client-upload). This method may be preferable for certain use cases.

**2\. Displaying the video in Next.js**

Once the video is uploaded and stored, you can display it in your Next.js application. Here's an example of how to do this using the tag and React Suspense:`<video>`

app/page.jsx

```
import { Suspense } from 'react'

import { list } from '@vercel/blob'

 

export default function Page() {

  return (

    <Suspense fallback={<p>Loading video...</p>}>

      <VideoComponent fileName="my-video.mp4" />

    </Suspense>

  )

}

 

async function VideoComponent({ fileName }) {

  const { blobs } = await list({

    prefix: fileName,

    limit: 1,

  })

  const { url } = blobs[0]

 

  return (

    <video controls preload="none" aria-label="Video player">

      <source src={url} type="video/mp4" />

      Your browser does not support the video tag.

    </video>

  )

}
```

In this approach, the page uses the video's URL to display the video using the . React Suspense is used to show a fallback until the video URL is fetched and the video is ready to be displayed.`@vercel/blob` `VideoComponent`

### Adding subtitles to your video

If you have subtitles for your video, you can easily add them using the element inside your tag. You can fetch the subtitle file from `<track>` `<video>` [Vercel Blob](https://vercel.com/docs/storage/vercel-blob?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) in a similar way as the video file. Here's how you can update the to include subtitles.`<VideoComponent>`

app/page.jsx

```
async function VideoComponent({ fileName }) {

  const {blobs} = await list({

    prefix: fileName,

    limit: 2

  });

  const { url } = blobs[0];

  const { url: captionsUrl } = blobs[1];

 

  return (

    <video controls preload="none" aria-label="Video player">

      <source src={url} type="video/mp4" />

      <track

        src={captionsUrl}

        kind="subtitles"

        srcLang="en"

        label="English">

      Your browser does not support the video tag.

    </video>

  );

};
```

By following this approach, you can effectively self-host and integrate videos into your Next.js applications.

## Resources

To continue learning more about video optimization and best practices, please refer to the following resources:

- **Understanding video formats and codecs**: Choose the right format and codec, like MP4 for compatibility or WebM for web optimization, for your video needs. For more details, see [Mozilla's guide on video codecs](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs).
- **Video compression**: Use tools like FFmpeg to effectively compress videos, balancing quality with file size. Learn about compression techniques at [FFmpeg's official website](https://www.ffmpeg.org/).
- **Resolution and bitrate adjustment**: Adjust [resolution and bitrate](https://www.dacast.com/blog/bitrate-vs-resolution/#:~:text=The%20two%20measure%20different%20aspects,yield%20different%20qualities%20of%20video) based on the viewing platform, with lower settings for mobile devices.
- **Content Delivery Networks (CDNs)**: Utilize a CDN to enhance video delivery speed and manage high traffic. When using some storage solutions, such as Vercel Blob, CDN functionality is automatically handled for you. [Learn more](https://vercel.com/docs/edge-network/overview?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) about CDNs and their benefits.

Explore these video streaming platforms for integrating video into your Next.js projects:

- Provides a component for Next.js, compatible with various hosting services including `<Video>` [Vercel Blob](https://vercel.com/docs/storage/vercel-blob?utm_source=next-site&utm_medium=docs&utm_campaign=next-website), S3, Backblaze, and Mux.
- [Detailed documentation](https://next-video.dev/docs) for using with different hosting services.`next-video.dev`

### Cloudinary Integration

- Official [documentation and integration guide](https://next.cloudinary.dev/) for using Cloudinary with Next.js.
- Includes a component for `<CldVideoPlayer>` [drop-in video support](https://next.cloudinary.dev/cldvideoplayer/basic-usage).
- Find [examples](https://github.com/cloudinary-community/cloudinary-examples/?tab=readme-ov-file#nextjs) of integrating Cloudinary with Next.js including [Adaptive Bitrate Streaming](https://github.com/cloudinary-community/cloudinary-examples/tree/main/examples/nextjs-cldvideoplayer-abr).
- Other [Cloudinary libraries](https://cloudinary.com/documentation) including a Node.js SDK are also available.

### Mux Video API

- Mux는 [스타터 템플릿](https://github.com/muxinc/video-course-starter-kit) Mux 및 Next.js로 비디오 코스를 만들기 위해.
- 임베딩에 대한 Mux의 권장 사항에 대해 알아보기 [Next.js 애플리케이션을 위한 고성능 비디오](https://www.mux.com/for/nextjs).
- 탐색 [예제 프로젝트](https://with-mux-video.vercel.app/) Next.js로 Mux를 시연합니다.

### 패스틀리

- Fastly의 솔루션 통합에 대해 자세히 알아보기 [주문형 비디오](https://www.fastly.com/products/streaming-media/video-on-demand) 미디어를 Next.js로 스트리밍합니다.