---
title: "Login with Kakao"
source: "https://supabase.com/docs/guides/auth/social-login/auth-kakao"
author:
  - "[[@supabase]]"
published: 2025-09-24
created: 2025-09-24
description: "Add Kakao OAuth to your Supabase project"
tags:
  - "clippings"
---
Auth

---

To enable Kakao Auth for your project, you need to set up an Kakao OAuth application and add the application credentials to your Supabase Dashboard.

## Overview

Kakao OAuth consists of six broad steps:

- Create and configure your app in the [Kakao Developer Portal](https://developers.kakao.com/).
- Obtaining a `REST API key` - this will serve as the `client_id`.
- Generating the `Client secret code` - this will serve as the `client_secret`.
- Additional configurations on Kakao Developers Portal.
- Add your `client id` and `client secret` keys to your [Supabase Project](https://supabase.com/dashboard).
- Add the login code to your [Supabase JS Client App](https://github.com/supabase/supabase-js).

## Access your Kakao Developer account

- Go to [Kakao Developers Portal](https://developers.kakao.com/).
- Click on `Login` at the top right to log in.

![Kakao Developers Portal.](https://supabase.com/docs/img/guides/auth-kakao/kakao-developers-page.png)

## Create and configure your app

- Go to `My Application`.
- Click on `Add an application` at the top.
- Fill out your app information:
	- App icon.
	- App name.
	- Company name.
- Click `Save` at the bottom right.

## Obtain a REST API key

This will serve as the `client_id` when you make API calls to authenticate the user.

- Go to `My Application`.
- Click on your app.
- You will be redirected to `Summary` tab of your app.
- In the `App Keys` section you will see `REST API key` -- this ID will become your `client_id` later.

## Find your callback URL

The next step requires a callback URL, which looks like this: `https://<project-ref>.supabase.co/auth/v1/callback`

- Go to your [Supabase Project Dashboard](https://supabase.com/dashboard)
- Click on the `Authentication` icon in the left sidebar
- Click on [`Providers`](https://supabase.com/dashboard/project/_/auth/providers) under the Configuration section
- Click on **Kakao** from the accordion list to expand and you'll find your **Callback URL**, you can click `Copy` to copy it to the clipboard

For testing OAuth locally with the Supabase CLI see the [local development docs](https://supabase.com/docs/guides/cli/local-development#use-auth-locally).

- To add callback URL on Kakao, go to `Product settings` > `Kakao Login` > `Redirect URI`.

## Generate and activate a client\_secret

- Go to `Product settings` > `Kakao Login` > `Security`.
- Click on the `Kakao Login` switch to enable Kakao Login.
- Click on `generate code` at the bottom to generate the `Client secret code` -- this will serve as a `client_secret` for your Supabase project.
- Make sure you enabled `Client secret code` by selecting `enable` from the `Activation state` section.

## Additional configurations on Kakao Developers portal

- Make sure the Kakao Login is enabled in the `Kakao Login` tab.
- Set following scopes under the "Consent Items": account\_email, profile\_image, profile\_nickname

![Consent items needs to be set.](https://supabase.com/docs/img/guides/auth-kakao/kakao-developers-consent-items-set.png)

## Add your OAuth credentials to Supabase

- Go to your [Supabase Project Dashboard](https://supabase.com/dashboard)
- In the left sidebar, click the `Authentication` icon (near the top)
- Click on [`Providers`](https://supabase.com/dashboard/project/_/auth/providers) under the Configuration section
- Click on **Kakao** from the accordion list to expand and turn **Kakao Enabled** to ON
- Enter your **Kakao Client ID** and **Kakao Client Secret** saved in the previous step
- Click `Save`

## Add login code to your client app

Make sure you're using the right `supabase` client in the following code.

If you're not using Server-Side Rendering or cookie-based Auth, you can directly use the `createClient` from `@supabase/supabase-js`. If you're using Server-Side Rendering, see the [Server-Side Auth guide](https://supabase.com/docs/guides/auth/server-side/creating-a-client) for instructions on creating your Supabase client.

When your user signs in, call [`signInWithOAuth()`](https://supabase.com/docs/reference/javascript/auth-signinwithoauth) with `kakao` as the `provider`:

```
12345async function () {  const { ,  } = await ..({    : 'kakao',  })}
```

For a PKCE flow, for example in Server-Side Auth, you need an extra step to handle the code exchange. When calling `signInWithOAuth`, provide a `redirectTo` URL which points to a callback route. This redirect URL should be added to your [redirect allow list](https://supabase.com/docs/guides/auth/redirect-urls).

In the browser, `signInWithOAuth` automatically redirects to the OAuth provider's authentication endpoint, which then redirects to your endpoint.

```
123456await ..({  ,  : {    : \`http://example.com/auth/callback\`,  },})
```

At the callback endpoint, handle the code exchange to save the user session.

Create a new file at `app/auth/callback/route.ts` and populate with the following:

###### app/auth/callback/route.ts

```
12345678910111213141516171819202122232425262728293031323334import { NextResponse } from 'next/server'// The client you created from the Server-Side Auth instructionsimport { createClient } from '@/utils/supabase/server'export async function GET(request: Request) {  const { searchParams, origin } = new URL(request.url)  const code = searchParams.get('code')  // if "next" is in param, use it as the redirect URL  let next = searchParams.get('next') ?? '/'  if (!next.startsWith('/')) {    // if "next" is not a relative URL, use the default    next = '/'  }  if (code) {    const supabase = await createClient()    const { error } = await supabase.auth.exchangeCodeForSession(code)    if (!error) {      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer      const isLocalEnv = process.env.NODE_ENV === 'development'      if (isLocalEnv) {        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host        return NextResponse.redirect(\`${origin}${next}\`)      } else if (forwardedHost) {        return NextResponse.redirect(\`https://${forwardedHost}${next}\`)      } else {        return NextResponse.redirect(\`${origin}${next}\`)      }    }  }  // return the user to an error page with instructions  return NextResponse.redirect(\`${origin}/auth/auth-code-error\`)}
```

When your user signs out, call [signOut()](https://supabase.com/docs/reference/javascript/auth-signout) to remove them from the browser session and any objects from localStorage:

```
123async function signOut() {  const { error } = await supabase.auth.signOut()}
```

## Using Kakao Login JS SDK

[Kakao Login JS SDK](https://developers.kakao.com/docs/latest/en/kakaologin/js) is an official Kakao SDK for authenticating Kakao users on websites.

Exchange the [authorization code returned by Kakao API](https://developers.kakao.com/docs/latest/en/kakaologin/rest-api#request-code) for an [ID Token](https://developers.kakao.com/docs/latest/en/kakaologin/common#login-with-oidc).

For example, this code shows a how to get ID Token:

Use the ID Token to sign in:

```
1234const res = await auth.signInWithIdToken({  provider: 'kakao',  token: id_token,});
```

### Configuration

1. Set 'State' to 'ON' under [OpenID Connect Activation](https://developers.kakao.com/docs/latest/en/kakaologin/prerequisite#activate-oidc) on Kakao Developers portal Application Dashboard.
2. Add `openid` to [scope](https://developers.kakao.com/docs/latest/en/kakaologin/common#additional-consent-scope) along with the scope values you wish to obtain consent for.

## Resources

- [Kakao Developers Portal](https://developers.kakao.com/).