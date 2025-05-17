## Introduction

This is my recruitment project for The Widlarz Group, showcasing a video presentation app that I developed. Below, I’ll document the challenges I encountered and the solutions I implemented.

## First Impressions with Expo and React Native

I didn’t expect it to work this seamlessly. This is my first time working with tools like these, and I’m genuinely impressed that I can launch the app on my phone just by scanning a QR code. The speed at which changes are applied is remarkable, and I’m pleasantly surprised by how responsive everything feels. I’m excited to see what else will amaze me.

## Selected File Architecture

I want the app to be modular and easily scalable, so I looked into best practices for structuring files in a React Native project. After reading the docs and several articles, I concluded that the following layout works best. It’s different from what I’m used to in other technologies, but it seems solid.

```
├── src
│   ├── assets
│   │   ├── images    # Project images
│   │   └── video     # Project videos
│   ├── components    # Global components
│   ├── constants     # Project constants (e.g., colors, fonts)
│   ├── navigation
│   │   └── AppNavigator.tsx  # Navigation setup
│   ├── redux         # State management
│   ├── screens       # Views organized by responsibility
│   │   └── login
│   │       ├── .login_screen.tsx.swp
│   │       ├── LoginScreen.tsx
│   │       └── LoginStyles.tsx
│   └── utils         # Global utility functions
```
