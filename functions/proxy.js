export async function onRequest(context) {
  const { request } = context;
  const urlObj = new URL(request.url);
  const targetUrl = urlObj.searchParams.get('url');

  if (!targetUrl) {
    return new Response("未提供目標網址", { status: 400 });
  }

  try {
    const targetObj = new URL(targetUrl);
    
    const modifiedRequest = new Request(targetUrl, {
      headers: {
        ...Object.fromEntries(request.headers),
        'Host': targetObj.host,
        'Referer': targetObj.origin + '/'
      },
      method: request.method,
      body: request.body,
      redirect: 'follow'
    });

    const response = await fetch(modifiedRequest);
    
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
    
    // 強制拔掉所有限制內嵌與防護的安全標頭
    newResponse.headers.delete('X-Frame-Options');
    newResponse.headers.delete('Content-Security-Policy');
    newResponse.headers.delete('X-Content-Type-Options');

    return newResponse;
  } catch (err) {
    return new Response("代理載入失敗: " + err.message, { status: 500 });
  }
}
