"""Export the recorded browser presentation to a two-minute H.264 MP4."""
import json
from pathlib import Path
import subprocess
import imageio_ffmpeg

root = Path(__file__).resolve().parent
meta = json.loads((root / 'capture.json').read_text())
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
subprocess.run([
    ffmpeg, '-y', '-ss', str(meta['startOffsetSeconds']), '-i', meta['raw'],
    '-t', '120', '-an', '-vf', 'setpts=PTS-STARTPTS,fps=25,tpad=stop_mode=clone:stop_duration=1,format=yuv420p',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19',
    '-movflags', '+faststart', str(root / 'between-us-presentation-2min.mp4')
], check=True)
