import { ref } from 'vue'

const spriteTypes = ['alien', 'blue', 'green', 'predator', 'red']

export function useAlienSpawner(positions, difficulty) {

    function getConfig() {
        if (difficulty.value === 'easy') {
            return {
                spawnInterval: 1200,
                visibleDuration: 2000
            }
        }

        if (difficulty.value === 'medium') {
            return {
                spawnInterval: 800,
                visibleDuration: 1500
            }
        }

        if (difficulty.value === 'hard') {
            return {
                spawnInterval: 500,
                visibleDuration: 1000
            }
        }

        return {
            spawnInterval: 1000,
            visibleDuration: 1500
        }
    }

    const aliens = ref(
        positions.map(pos => ({
            ...pos,
            visible: false,
            state: 'idle',
            type: 'alien'
        }))
    )

    function spawnAlien() {
        const { visibleDuration } = getConfig()

        const index = Math.floor(Math.random() * aliens.value.length)
        const alien = aliens.value[index]

        if (alien.visible) return

        const randomType = spriteTypes[Math.floor(Math.random() * spriteTypes.length)]
        alien.type = randomType

        alien.visible = true
        alien.state = 'jump'

        const JUMP_DURATION = 400

        // 🟢 เข้า → jump → idle
        setTimeout(() => {
            alien.state = 'idle'
        }, JUMP_DURATION)

        // 🔴 ออก → jump
        setTimeout(() => {
            alien.state = 'jump'
        }, visibleDuration)

        // ❌ หาย “หลัง jump ออกจบ”
        setTimeout(() => {
            alien.visible = false
        }, visibleDuration + JUMP_DURATION)
    }

    let timer = null

    function start() {
        if (timer) return

        const { spawnInterval } = getConfig()

        timer = setInterval(spawnAlien, spawnInterval)
    }

    function stop() {
        clearInterval(timer)
        timer = null
    }

    return {
        aliens,
        spawnAlien,
        start,
        stop
    }
}