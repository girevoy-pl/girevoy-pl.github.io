# Media Recorder API Demo
A demo implementation of the (new) [Media Recorder API](http://w3c.github.io/mediacapture-record/MediaRecorder.html) (also known as MediaStream Recording API).

Works on:
* Firefox 30+
* Chrome 47,48 (video only, enable experimental Web Platform features at chrome://flags)
* Chrome 49+

Containers & codecs:
* Chrome 52+ : webm, VP8/VP9/H.264, Opus @ 48kHz
* Chrome 49+ : webm, VP8/VP9, Opus @ 48kHz
* Firefox 30+: webm,VP8, Vorbis @ 44.1 kHz

Issues:
* Pause does not stop audio recording on Chrome 49,50


Links:
* [Live demo of this code](https://addpipe.com/media-recorder-api-demo/)
* [Article: HTML5’s Media Recorder API in Action on Chrome and Firefox](https://blog.addpipe.com/mediarecorder-api/)
* [W3C Draft (Latest published version)](https://www.w3.org/TR/mediastream-recording/)
* [Media Recorder API at 65% penetration thanks to Chrome](https://addpipe.com/media-recorder-api-demo/)

Links:
* https://python.land/virtual-environments/virtualenv
* https://davidwalsh.name/video-blur-faces
* https://github.com/ORB-HD/deface
* https://www.fastpix.io/blog/av1-vs-h-264-vs-h-265-best-codec-for-video-streaming
* https://blog.frame.io/2024/02/26/video-bitrates-and-export-myths/
* https://ottverse.com/convert-webm-to-mp4-with-ffmpeg/
* https://trac.ffmpeg.org/wiki/Encode/AV1
* https://www.chosic.com/download-audio/39324/

```code
## FFMPEG

for A in *.webm; do ffmpeg -i "$A" -ac 1 -codec:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 60 -application audio -codec:v libx265 -preset veryfast -x265-params crf=23 -codec:s copy "out/${A}"; done


for A in *.webm; do ffmpeg -i "$A" -vf "format=gray, colorlevels=rimin=0.0:gimin=0.0:bimin=0.0, colorlevels=rimax=1.0:gimax=1.0:bimax=1.0" -ac 1 -codec:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 60 -application audio  -codec:v libvpx-vp9 -b:v 1M -crf 32 -deadline good  -codec:s copy "out/${A%.webm}_optimized.webm"; done


for A in *.webm; do ffmpeg -i "$A" -c:v libaom-av1 -crf 23 -cpu-used 4 -strict experimental -ac 1 -codec:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 60 -application audio -movflags +faststart "out/${A%.webm}_optimized.mp4"; done


###
ffmpeg -i video_6982242.webm -vf "format=gray, colorlevels=rimin=0.0:gimin=0.0:bimin=0.0, colorlevels=rimax=1.0:gimax=1.0:bimax=1.0" -ac 1 -c:v libx265 -crf 19 -c:a aac h265_optimized_crf19.mp4 copy "out/video_6982242_optimized_crf19.mp4"

ffmpeg -i video_6982242.webm -vf "format=gray, colorlevels=rimin=0.0:gimin=0.0:bimin=0.0, colorlevels=rimax=1.0:gimax=1.0:bimax=1.0" -ac 1 -c:v libaom-av1 -c:a aac av1_optimized.mp4 copy "out/video_6982242_optimized_av1.mp4"
ffmpeg -i video_6982242.webm -vf "format=gray, colorlevels=rimin=0.0:gimin=0.0:bimin=0.0, colorlevels=rimax=1.0:gimax=1.0:bimax=1.0" -ac 1 -c:v libaom-av1 -crf 23 -c:a aac av1_optimized_crf23.mp4 copy "out/video_6982242_av1_crf23_optimized.mp4"


for A in *.webm; do ffmpeg -i "$A" -vf "format=gray, colorlevels=rimin=0.0:gimin=0.0:bimin=0.0, colorlevels=rimax=1.0:gimax=1.0:bimax=1.0" -ac 1 -codec:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 60 -application audio  -codec:v libvpx-vp9 -codec:s copy "out/${A%.webm}_optimized.mp4"; done


####
# grayscale
for A in *.webm; do \
  ffmpeg -i "$A" \
  -vf "format=gray" \
  -c:v libx265 -cpu-used 4 \
  -strict experimental \
  -ac 1 -codec:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 60 -application audio \
  -movflags +faststart \
  "out/${A%.webm}_grayscale.mp4"; \
done

# regular color
for A in *.webm; do \
  ffmpeg -i "$A" \
  -c:v libx265 -cpu-used 4 \
  -strict experimental \
  -ac 1 -codec:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 60 -application audio \
  -movflags +faststart \
  "out/${A%.webm}_color.mp4"; \
done

# add audio
ffmpeg -i 'out/video_6982242_color.mp4' -stream_loop -1 -i 'music/True-Patriot.mp3' -c:v copy -shortest -map 0:v -map 1:a -y 'out/video_6982242_color_audio.mp4'


#with audio
ffmpeg -i /out/video_6982242_color.mp4 -stream_loop -1 -i 'music/True-Patriot.mp3' -c:v copy -shortest -map 0:v -map 1:a -y '/out/video_6982242_color_audio.mp4'

# final

# regular color
for A in *.webm; do \
  ffmpeg -i "$A" \
  -c:v libx265 -cpu-used 4 \
  -strict experimental \
  -ac 1 -codec:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 60 -application audio \
  -movflags +faststart \
  "out/${A%.webm}_color.mp4"; \
done

#with audio compressed
ffmpeg -i 'out/video_6982242_color.mp4' -stream_loop -1 -i 'music/True-Patriot.mp3' -c:v copy -shortest -map 0:v -map 1:a -y -ac 1 -codec:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 60 -application audio 'out/video_6982242_color_audio.mp4'


# automated
for A in *.webm; do \
  ffmpeg -i "$A" \
  -c:v libx265 -cpu-used 4 \
  -strict experimental \
  -ac 1 -codec:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 60 -application audio \
  -movflags +faststart \
  "out/${A%.webm}_color.mp4"; \
done

for A in out/*.mp4; do \
  ffmpeg -i "$A" \
  -stream_loop -1 -i 'music/True-Patriot.mp3' \
  -c:v copy -shortest \
  -map 0:v -map 1:a -y \
  -ac 1 -codec:a libopus \
  -b:a 48k -vbr on \
  -compression_level 10 \
  -frame_duration 60 \
  -application audio \
  "out/$(basename "${A%.mp4}_color_audio.mp4")"; \
done

# automated in one go

for A in *.webm; do \
  ffmpeg -i "$A" \
  -stream_loop -1 -i "music/True-Patriot.mp3" \
  -c:v libx265 -crf 23 -preset fast -cpu-used 4 \
  -map 0:v -map 1:a -shortest \
  -ac 1 -codec:a libopus -b:a 48k -vbr on -compression_level 10 -frame_duration 60 -application audio \
  -movflags +faststart \
  "out/$(basename "${A%.webm}_color_audio.mp4")"; \
done

# 

for A in *.webm; do \
  ffmpeg -i "$A" -stream_loop -1 -i "music/True-Patriot.mp3" \
  -c:v libx265 -crf 23 -preset fast -cpu-used 4 -row-mt 1 -tiles 4x4 -tile-columns 2 -pix_fmt yuv420p \
  -c:a libopus -b:a 48k -vbr on -compression_level 10 \
  -map 0:v -map 1:a -shortest \
  -movflags +faststart \
  "out/$(basename "${A%.webm}_compressed_with_audio.mp4")"; \
done


# bw

for A in *.webm; do \
  ffmpeg -i "$A" -stream_loop -1 -i "music/True-Patriot.mp3" \
  -c:v libx265 -crf 24 -preset medium -cpu-used 4 -row-mt 1 -tiles 4x4 -tile-columns 2 -pix_fmt yuv420p \
  -vf "hue=s=0" \
  -c:a libopus -b:a 48k -vbr on -compression_level 10 \
  -map 0:v -map 1:a -shortest \
  -movflags +faststart \
  "out/$(basename "${A%.webm}_bw_compressed_with_audio.mp4")"; \
done


### READY 

project-folder/
├── script.sh                  # Your script runs from here
├── video1.webm                # Input .webm files
├── video2.webm
├── music/
│   └── True-Patriot.mp3       # MP3 file to loop
└── out/
    ├── video1_compressed_with_audio.mp4  # Output .mp4 files with new audio
    └── video2_compressed_with_audio.mp4

# qHD - h.265

mkdir -p out && for A in *.webm; do \
  ffmpeg -i "$A" -stream_loop -1 -i "music/True-Patriot.mp3" \
  -c:v libx265 -crf 24 -preset medium -cpu-used 4 -row-mt 1 -tiles 4x4 -tile-columns 2 -pix_fmt yuv420p \
  -vf "hue=s=0,scale=960:540" \
  -c:a libopus -b:a 48k -vbr on -compression_level 10 \
  -map 0:v -map 1:a -shortest \
  -movflags +faststart \
  "out/$(basename "${A%.webm}_bw_compressed_with_audio_h265_qHD.mp4")"; \
done


# qHD - h.264

for A in *.webm; do \
  ffmpeg -i "$A" -stream_loop -1 -i "music/True-Patriot.mp3" \
  -c:v libx264 -crf 24 -preset medium -pix_fmt yuv420p \
  -vf "hue=s=0,scale=960:540" \
  -c:a libopus -b:a 48k -vbr on -compression_level 10 \
  -map 0:v -map 1:a -shortest \
  -movflags +faststart \
  "out/$(date +'%Y%m%d')_$(basename "${A%.webm}_bw_compressed_with_audio_h264_avc_qHD.mp4")"; \
done


####### ALMOST READY

# qHD - h.264 - ready for the deface addressing this
# IMAGEIO FFMPEG_WRITER WARNING: input image is not divisible by macro_block_size=16,
# resizing from (960, 540) to (960, 544) to ensure video compatibility with most codecs and players. 
# To prevent resizing, make your input image divisible by the macro_block_size or set the macro_block_size to 1 (risking incompatibility)

for A in *.webm; do \
  ffmpeg -i "$A" -stream_loop -1 -i "music/True-Patriot.mp3" \
  -c:v libx264 -crf 24 -preset medium -pix_fmt yuv420p \
  -vf "hue=s=0,scale=960:540,pad=960:544:0:2" \
  -c:a libopus -b:a 48k -vbr on -compression_level 10 \
  -map 0:v -map 1:a -shortest \
  -movflags +faststart \
  "out/$(date +'%Y%m%d')_$(basename "${A%.webm}_h264_avc_bw_qHD_a.mp4")"; \
done

##

https://github.com/ORB-HD/deface

##
python3 -m venv /home/piotrek/python/deface
source /home/piotrek/python/deface/bin/activate
# run command
deface /home/piotrek/Downloads/rec/out/video_3774973_bw_compressed_with_audio_h264_avc.mp4

# once done
deactivate

######### READY

# nagrany material video -> zmien w webm do mp4
ffmpeg -i video_3774973.webm -c copy out/output.mp4
# w srodowisku virtualnym pythona uruchom
deface /home/piotrek/Downloads/rec/video_3774973.mp4

for A in *_anonymized.mp4; do \
  ffmpeg -i "$A" -stream_loop -1 -i "music/True-Patriot.mp3" \
  -c:v libx264 -crf 24 -preset medium -pix_fmt yuv420p \
  -vf "hue=s=0,scale=960:540,pad=960:544:0:2" \
  -c:a libopus -b:a 48k -vbr on -compression_level 10 \
  -map 0:v -map 1:a -shortest \
  -movflags +faststart \
  "out/$(date +'%Y%m%d')_$(basename "${A%.webm}_h264_avc_bwa_qHD.mp4")"; \
done

```
