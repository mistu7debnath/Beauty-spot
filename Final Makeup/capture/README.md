Makeup preview capture utility

This small tool uses Puppeteer to open the local `index.html` and simulate clicking each product in the `#makeup-features` modal, capturing a short sequence of screenshots for each product. You can convert the captured frames to GIF or MP4 using ffmpeg.

Usage

1. Install dependencies (Node.js required):

```bash
cd capture
npm install
```

2. Run the capture script:

```bash
npm run capture
```

Captured frames will appear in `capture/output/<product>/frame-###.png`.

Convert frames to GIF with ffmpeg (example):

```bash
# from within capture folder, for `foundation` frames
ffmpeg -framerate 15 -i output/foundation/frame-%03d.png -vf "scale=720:-1:flags=lanczos" -y foundation.gif
```

Notes
- The script launches a headless Chromium; if animations rely on user input or focus, try setting headless:false in `capture.js`.
- Adjust `WAIT_AFTER_CLICK` and `FRAMES_PER_PRODUCT` in `capture.js` to control capture duration and smoothness.
