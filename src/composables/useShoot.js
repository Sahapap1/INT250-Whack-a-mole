import shootSoundFile from '@/assets/sound/Laser.mp3'
import hitSoundFile from '@/assets/sound/Kill-Plus.MP3'
import missSoundFile from '@/assets/sound/Missed.mp3'
import penaltySoundFile from '@/assets/sound/Kill-Minus.MP3'

export function useShoot({
  flashes,
  alienPositions,
  score,
  combo,
  MAX_COMBO,
  triggerScoreEffect,
  shootTrigger
}) {

  const GUN_DURATION = 300

  function playSound(src, volume = 0.5) {
    const s = new Audio(src)
    s.volume = volume
    s.play()
  }

  function shootAlien(alien, index) {

    // 🔫 ยิง
    shootTrigger.value++
    playSound(shootSoundFile, 0.7)

    const pos = alienPositions[index]
    const id = Date.now() + Math.random()

    // 💥 flash
    setTimeout(() => {
      flashes.value.push({
        id,
        left: pos.left,
        top: pos.top
      })

      setTimeout(() => {
        flashes.value = flashes.value.filter(f => f.id !== id)
      }, 300)

    }, GUN_DURATION)

    // 🎯 logic ยิง
    setTimeout(() => {

      // ❌ ยิงพลาด
      if (!alien || !alien.visible || alien.state === 'dead') {
        combo.value = 1
        playSound(missSoundFile, 0.7)
        return
      }

      alien.state = 'dead'

      // 🔻 ตัวลบคะแนน
      if (alien.type === 'predator') {
        score.value -= 20
        combo.value = 1

        triggerScoreEffect('down')
        playSound(penaltySoundFile, 0.7)

      }
      // 🔥 alien
      else if (alien.type === 'alien') {
        score.value += 30 * combo.value
        combo.value = Math.min(combo.value + 1, MAX_COMBO)

        triggerScoreEffect('up')
        playSound(hitSoundFile, 0.7)

      }
      // 🔵 blue
      else if (alien.type === 'blue') {
        score.value += 15 * combo.value
        combo.value = Math.min(combo.value + 1, MAX_COMBO)

        triggerScoreEffect('up')
        playSound(hitSoundFile, 0.7)

      }
      // 🟢 green
      else if (alien.type === 'green') {
        score.value += 10 * combo.value
        combo.value = Math.min(combo.value + 1, MAX_COMBO)

        triggerScoreEffect('up')
        playSound(hitSoundFile, 0.7)

      }
      // 👾 default
      else {
        combo.value = Math.min(combo.value + 1, MAX_COMBO)
        score.value += combo.value * 5

        triggerScoreEffect('up')
        playSound(hitSoundFile, 0.7)
      }

      // ❌ หายหลังตาย
      setTimeout(() => {
        alien.visible = false
      }, 300)

    }, GUN_DURATION)
  }

  return {
    shootAlien
  }
}