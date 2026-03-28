import clickSoundFile from '@/assets/sound/SelectButton.MP3'

export function useUISound() {

  function playClick(volume = 0.5) {
    const s = new Audio(clickSoundFile)
    s.volume = volume
    s.play()
  }

  return {
    playClick
  }
}