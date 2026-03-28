import { ref } from 'vue'
import bgMusic from '@/assets/sound/BackgroundSound.mp3'

const isMuted = ref(false)

let audio = null
let initialized = false

export function useAudio() {

    function init() {
        if (initialized) return
        initialized = true

        audio = new Audio(bgMusic)
        audio.loop = true
        audio.volume = 0.3

        // 🔥 เล่นเสียงหลัง user interaction ครั้งแรก
        const startAudio = () => {
            if (!isMuted.value) {
                audio.play().catch(() => { })
            }
        }

        window.addEventListener('click', startAudio, { once: true })
    }
    function playWithFade() {
        audio.volume = 0
        audio.play()

        let v = 0
        const fade = setInterval(() => {
            v += 0.05
            audio.volume = Math.min(v, 0.4)

            if (v >= 0.4) clearInterval(fade)
        }, 100)
    }

    function toggle() {
        if (!audio) return

        isMuted.value = !isMuted.value

        if (isMuted.value) {
            audio.pause()
        } else {
            playWithFade()
        }
    }
    return {
        isMuted,
        init,
        toggle
    }
}