import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./Loading";

interface ScreenshootButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshootButton({
  screenshot,
  onScreenshotTook
}: ScreenshootButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);
  
  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64Image = canvas.toDataURL('image/png');

    onScreenshotTook(base64Image);

    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTook(null)}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        style={{ 
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
         }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-md border-transparent hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-zinc-900 dark:focus:ring-brand-500"
    >
      { isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6 text-zinc-900 dark:text-zinc-100" /> }
    </button>
  )
}