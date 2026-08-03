'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface Props {
  slug: string;
  title: string;
}

const SPEEDS = [1, 1.25, 1.5, 2];

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds) || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function BlogAudioPlayer({ slug, title }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  const handlePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!loaded) {
      setLoading(true);
      setError(false);
      audio.src = `/api/audio/${slug}`;
      audio.load();
      setLoaded(true);
      return;
    }

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setError(true);
      }
    }
  }, [loaded, playing, slug]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  };

  const progress = duration > 0 && isFinite(duration) ? (currentTime / duration) * 100 : 0;
  const showTime = duration > 0 && isFinite(duration);

  if (!mounted) {
    return (
      <div className="mb-8 border border-slate-200 bg-white overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-200 animate-pulse" />
            <div className="w-36 h-4 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="w-24 h-4 rounded bg-slate-200 animate-pulse" />
              <div className="w-full h-2 rounded-full bg-slate-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 border border-slate-200 bg-white overflow-hidden">
      <audio
        ref={audioRef}
        onCanPlay={async () => {
          setLoading(false);
          try {
            await audioRef.current?.play();
            setPlaying(true);
          } catch {
            setError(true);
          }
        }}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onEnded={() => { setPlaying(false); setCurrentTime(0); }}
        onError={() => { setLoading(false); setError(true); }}
        preload="none"
      />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3a9 9 0 0 0-9 9v7a1 1 0 0 0 1 1h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H4.07A8 8 0 0 1 12 5a8 8 0 0 1 7.93 7H18a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2a1 1 0 0 0 1-1v-7a9 9 0 0 0-9-9z"/>
          </svg>
          <span className="text-sm font-semibold text-blue-950">Listen to this article</span>
        </div>
        <span className="text-[11px] text-slate-400 italic">{title.length > 42 ? title.slice(0, 42) + '…' : title}</span>
      </div>

      {/* Controls */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-4">

          {/* Circular play / pause button */}
          <button
            onClick={handlePlayPause}
            disabled={loading}
            aria-label={playing ? 'Pause' : 'Play'}
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-950 hover:bg-blue-800 disabled:bg-blue-900/50 text-white transition-colors duration-200 cursor-pointer disabled:cursor-wait shadow-sm"
          >
            {loading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : playing ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 translate-x-0.4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            )}
          </button>

          {/* Right side: wave + track + time */}
          <div className="flex-1 min-w-0">

            {/* Wave bars + time row */}
            <div className="flex items-center justify-between mb-3 h-5">
              {/* Animated bars — show while playing, static dots while paused/idle */}
              <div className="flex items-end gap-[3px] h-5">
                {playing ? (
                  [1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="audio-bar" style={{ height: 3 }} />
                  ))
                ) : (
                  [1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-[3px] rounded-sm bg-slate-300" style={{ height: 3 }} />
                  ))
                )}
              </div>

              {/* Time display */}
              <span className={`text-xs tabular-nums ${error ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                {error
                  ? 'Audio unavailable'
                  : showTime
                    ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                    : loading
                      ? 'Loading…'
                      : null}
              </span>
            </div>

            {/* Progress track */}
            <div className="relative h-2 bg-slate-100 rounded-full">
              <div
                className="absolute inset-y-0 left-0 bg-blue-600 rounded-full transition-none"
                style={{ width: `${progress}%` }}
              />
              {/* Playhead dot */}
              {progress > 0 && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full shadow-sm border-2 border-white"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              )}
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                disabled={!loaded || loading || !showTime}
                aria-label="Seek"
                className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-default h-full"
              />
            </div>

            {/* Speed toggle */}
            <div className="flex justify-end mt-2">
              <button
                onClick={cycleSpeed}
                disabled={!loaded || loading}
                className="text-[11px] font-semibold text-slate-400 hover:text-blue-600 disabled:opacity-40 transition-colors duration-150 cursor-pointer px-1"
              >
                {SPEEDS[speedIdx]}x
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
