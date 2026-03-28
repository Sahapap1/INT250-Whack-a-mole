import { onMounted, onUnmounted } from 'vue'



export function useKeyboardShoot(aliens, shootFn, control) {


  function getKeyMap() {
    if (control.value === 'numbers') {
      return {
        Numpad7: 0, Numpad8: 1, Numpad9: 2,
        Numpad4: 3, Numpad5: 4, Numpad6: 5,
        Numpad1: 6, Numpad2: 7, Numpad3: 8
      }
    }

    // default keyboard
    return {
      KeyQ: 0, KeyW: 1, KeyE: 2,
      KeyA: 3, KeyS: 4, KeyD: 5,
      KeyZ: 6, KeyX: 7, KeyC: 8
    }
  }

  let lastKeyTime = 0
  const KEY_DELAY = 200

  function handleKey(e) {
    if (e.repeat) return

    const now = Date.now()
    if (now - lastKeyTime < KEY_DELAY) return

    const keyMap = getKeyMap()
    const code = e.code

    if (!(code in keyMap)) return

    lastKeyTime = now

    const index = keyMap[code]
    const alien = aliens.value[index]

    // 🔊 เล่นเสียงยิง

    shootFn(alien, index)
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKey)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
  })
}