self.__uv$config = {
    prefix: '/service/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
    
    // 👇 手動補上這行公開且目前還活著的 Bare 伺服器網址
    bare: 'https://bare.benroaz.com/',
};
