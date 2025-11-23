# 🌌 **CRYPTO GALAXY**

### *Fly through the universe of cryptocurrencies — in full 3D*

![Banner](banner.png)

---

## 🌟 **Über das Projekt**

**Crypto Galaxy** ist eine **interaktive 3D-Visualisierung der Kryptomärkte**, gebaut mit **Next.js**, **React Three Fiber** & **Three.js**.
Jeder Coin wird als **Planet** dargestellt — inklusive Orbit-Effekten, Glow, Hover-Animationen, Logoblende, Ring-System und Live-Kursdaten.

> **Erlebe die Crypto-Welt wie in einem Sci-Fi-Game.**

---

## 🚀 **Features**

### 🪐 3D Crypto-Planeten

* Individuelles Material & Glow basierend auf dem Coin
* Automatische Positionierung im 3D-Space (keine Überschneidungen)
* Orbit-Ring abhängig vom Preis-Trend (grün/red)
* Hover-Effekt: Glow, Scaling, Wobble Animation
* Billboard-Logo immer zur Kamera ausgerichtet

### 🌠 Dynamisches Space-Environment

* **Animated Stars** mit echter 3D-Rotation
* Wide-angle Camera & Orbit Controls
* Night-Environment mit physikalischem Lighting

### 📡 Live Crypto Data (CoinGecko)

* Automatische Aktualisierung alle 30 Sekunden
* Instant-Refresh Button
* Anzeige von:

  * Preis
  * Market Cap
  * 24h Veränderung
  * Volume
  * Top-Market Stats (Bullish Coins, Market Cap, Volume etc.)

### 🌌 UI / UX Highlights

* Dark-Nebula Gradient Design
* Crypto Grid View
* Smooth Hover Interactions
* Responsive Layout
* 3D Scene als „Galaxy Window“

---

## 🛠️ **Tech Stack**

### **Frontend**

* **Next.js 16**
* **React 19**
* **React Three Fiber**
* **Three.js**
* **Tailwind CSS 4**
* **Drei (R3F Helpers)**

### **API**

* 🔗 **CoinGecko Market API**

---

## 🔧 Installation

```bash
git clone https://github.com/akocerke/crypto-galaxy.git
cd crypto-galaxy
npm install
npm run dev
```

App startet unter:

```
http://localhost:3000
```

---

## 📁 Projektstruktur

```
app/
├── components/
│   ├── Scene.js
│   ├── CryptoPlanet.js
│   ├── AnimatedStars.js
│
├── lib/
│   ├── cryptoApi.js
│
├── page.js
|
└── globals.css
```

---

## 🎮 **How It Works**

### 1️⃣ Coins werden geladen

`getCryptoData()` holt 20 Top-Coins über CoinGecko.

### 2️⃣ Planeten werden generiert

Jeder Coin:

* bekommt eine Position im Galaxy-Space
* erhält individuelle Material-Properties
* generiert ein Billboard-Logo
* bekommt einen Hover-Effekt

### 3️⃣ 3D Szene rendert das Galaxy

Mit:

* Beleuchtung
* Camera + OrbitControls
* Animated Stars
* Dynamischem Environment

### 4️⃣ Interaktionen

* Klick auf Planet → Coin Detail Modal
* Hover → Glow/Swell Effect
* Refresh → neue Daten

---

## 🖼️ Screens (Optional)

Hier kannst du später GIFs/Screenshots einbauen:

```
/screens/
 ├── galaxy.png
 ├── planets.gif
 ├── modal.png
```

---

## ❤️ Support

Wenn dir das Projekt gefällt:

⭐ **Repo star geben**
🐛 Issues melden
🔧 Pull Requests willkommen

---

## 📜 Lizenz

MIT License — frei für jede Art der Nutzung.

---

## ✨ Abschluss

> **Crypto Galaxy ist kein Dashboard.
> Es ist eine Erfahrung.
> Ein Trip durch den Kryptomarkt.** 🚀🪐

---
