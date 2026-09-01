interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  preload?: 'metadata' | 'none' | 'auto';
  className?: string;
}

export function VideoPlayer({ src, poster, title, preload = 'metadata', className }: VideoPlayerProps) {
  return (
    <figure className={`video-figure ${className || ''}`}>
      <video
        src={`/media/${src}`}
        poster={poster ? `/media/${poster}` : undefined}
        controls
        playsInline
        preload={preload}
        title={title}
        className="video-player"
      >
        <track
          kind="captions"
          src={`/media/${src.replace('.mp4', '.vtt')}`}
          srcLang="es"
          label="Español"
          default
        />
        Tu navegador no soporta video HTML5.
      </video>
      <figcaption>{title}</figcaption>
    </figure>
  );
}