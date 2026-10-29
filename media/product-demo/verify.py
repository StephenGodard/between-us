"""Decode the entire final MP4 and save a sampled contact sheet for visual review."""
from pathlib import Path
import json
import imageio_ffmpeg
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent
frames = imageio_ffmpeg.read_frames(str(root / 'between-us-presentation-2min.mp4'), pix_fmt='rgb24')
meta = next(frames)
width, height = meta['size']
times = [0, 8, 22, 28, 33, 40, 49, 59, 69, 78, 90, 104, 113, 119]
targets = {round(t * meta['fps']): t for t in times}
sheet = Image.new('RGB', (960, 294 * 7), '#eaf8f8')
draw = ImageDraw.Draw(sheet)
count = 0
sample = 0
for frame in frames:
    if count in targets:
        im = Image.frombytes('RGB', (width, height), frame)
        x, y = (sample % 2) * 480, (sample // 2) * 294
        sheet.paste(im.resize((480, 270)), (x, y))
        draw.text((x + 10, y + 275), f"{targets[count]:03d} s", fill='#122a30')
        if targets[count] in (59, 90, 104, 119):
            im.save(root / f"export-{targets[count]:03d}s.png")
        sample += 1
    count += 1
sheet.save(root / 'contact-sheet.jpg', quality=92)
result = {'size': meta['size'], 'fps': meta['fps'], 'duration': meta['duration'], 'decodedFrames': count, 'sampledFrames': sample, 'audioCodec': meta.get('audio_codec')}
assert tuple(meta['size']) == (1920, 1080), result
assert abs(meta['duration'] - 120) < .05, result
assert count == 3000, result
(root / 'verification.json').write_text(json.dumps(result, indent=2))
print(json.dumps(result, indent=2))
