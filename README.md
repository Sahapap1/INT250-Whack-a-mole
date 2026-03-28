# 🎮 SHOOT-AN-ALIEN

เกมยิงเอเลี่ยนแบบ Reaction Game ที่พัฒนาโดยใช้ Vue 3  
ผู้เล่นต้องกดยิงเอเลี่ยนตามตำแหน่งที่ปรากฏให้เร็วและแม่นยำที่สุดภายในเวลาที่กำหนด ⏱️

---

## 🚀 Features

- 🎯 ยิงเอเลี่ยนด้วย Keyboard (QWE / ASD / ZXC หรือ Numpad)
- ⚡ ระบบ Combo เพิ่มคะแนนเมื่อยิงต่อเนื่อง
- 💥 เอฟเฟกต์ Flash และ Animation ยิง
- 🔊 Sound Effects (ยิง, โดน, พลาด, ลบคะแนน)
- 🎵 Background Music + ปุ่มเปิด/ปิดเสียง
- ⏸️ ระบบ Pause / Resume
- 🔁 Restart เกม
- ⏱️ Countdown Timer 1 นาที
- 🧠 Difficulty Levels (Easy / Medium / Hard)

---

## 🎮 Gameplay

- ยิงโดน → ได้คะแนน + Combo
- ยิงพลาด → Combo รีเซ็ต
- ยิงโดนตัวลบคะแนน → คะแนนลด
- Combo สูง → คะแนนคูณมากขึ้น

---

## 🛠️ Tech Stack

- Vue 3 (Composition API)
- Vite
- TailwindCSS
- JavaScript (ES6)

---

## 📂 Project Structure

src/
├── components/
│ ├── Alien.vue
│ ├── Blaster.vue
│ ├── Flash.vue
│ └── MuteButton.vue
│
├── composables/
│ ├── useAlienSpawner.js
│ ├── useKeyboardShoot.js
│ ├── useShoot.js
│ └── useAudio.js
│
├── views/
│ ├── GameView.vue
│ └── ResultView.vue
│
└── assets/
├── sprite/
└── sound/

---

## ▶️ How to Run

```bash
npm install
npm run dev
```

---

| 👤 Member         | 💼 Responsibility                                |
| ----------------- | ------------------------------------------------ |
| 👨‍💻 Developer 1 | Game Logic (shoot, score, combo system)          |
| 👩‍💻 Developer 2 | UI / UX Design (layout, animation, responsive)   |
| 👨‍💻 Developer 3 | Sound System (BGM, SFX, mute system)             |
| 👩‍💻 Developer 4 | Game Mechanics (spawn system, difficulty, timer) |

---

📌 Notes
 - ใช้ Composition API เพื่อแยก logic เป็น modular (composables)
 - รองรับการเล่นทั้ง keyboard และ numpad

---

📷 Preview
<img width="1903" height="861" alt="image" src="https://github.com/user-attachments/assets/0c357887-3f8d-4214-b186-06a558f7e833" />
<img width="1899" height="849" alt="image" src="https://github.com/user-attachments/assets/bd66ee9e-ab35-4d19-8d3e-1b656a7fd5a3" />




---

🧑‍🎓 Developed for

INT250 CSS Framework SIT-KMUTT
