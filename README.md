## Introduction

This is my recruitment project for The Widlarz Group, showcasing a video presentation app that I developed. Below, I’ll document the challenges I encountered and the solutions I implemented.

## How to run it?

1. Choose a suitable location on your computer and run `git clone https://github.com/sqsiek0/twg_recruitment_video_app.git`
2. Install the required packages with npm install
3. Since an API key is needed, you must create a .env file
```
  1. Open the project in your IDE  
  2. Create a `.env` file  
  3. Add the variable YOUTUBE_API_KEY=YourKeyHere  
```
4. Launch the project using the command npx expo
5. Press the “s” key to enable development mode
6. Choose a platform

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
│   ├── screens       # Views organized by responsibility
│   │   └── login
│   │       ├── .login_screen.tsx.swp
│   │       ├── LoginScreen.tsx
│   │       └── LoginStyles.tsx
│   └── utils         # Global utility functions
```

## Commit Strategy

In this project, I decided to follow a consistent commit convention. I used the ***Conventional Commits*** standard and tried to apply it as accurately as possible when creating commits, which is reflected in the commit history.

#### Why did I choose this approach?
> [!NOTE]
> In my opinion, it’s a good practice because it improves collaboration within a team. It helps everyone understand what their teammates intended when working on their branches.

## Project Breakdown

The entire project can be divided into **three main parts**, each implemented sequentially. The plan was to create a separate branch for each feature, implement it there, and then merge it before moving on to the next part. Between the main sections, there were also smaller sub-sections.

### Stage 0

Configuration and creation of the login screen. This screen acts as an onboarding view for the entire application. It explains what the app is about, and the only available action is to “log in” as a guest. There’s also an option to open the terms and conditions, which redirects the user to a Google page.

<p align="center">
  <img src="https://github.com/user-attachments/assets/87bbd2a1-c2ac-40a0-b8a6-7278dcdd79c0" alt="Alt Text" style="height: 600px; object-fit: contain;">
</p>

-----

### Stage 1

The main screen is divided into four sections, each corresponding to a different topic. These sections are fetched from the YouTube API, specifically through keyword-based searches. When developing the app, it was important to ensure that data is not fetched every time the user switches tabs, as this would quickly consume all available tokens. Therefore, a ***data caching mechanism was implemented*** so that when navigating between tabs, the data does not refresh but is retrieved from the cache. This view connects with all other parts of the app, but this aspect is omitted at this stage.

<p align="center">
  <img src="https://github.com/user-attachments/assets/8a6aeb09-30c9-4e6b-b279-175f6a7ccdf1" alt="Alt Text" style="height: 600px; object-fit: contain;">
</p>

------

### Stage 2

The most challenging screen of all was the video view. Fetching and displaying the data itself wasn’t difficult, but the real challenge began when it came to actually using the video player component. The solution involved thoroughly reading the package documentation and discovering that it was necessary to create an `./ios` folder and properly configure it to make the player work.

After the correct setup, everything functioned as expected, and video control buttons were implemented.

<p align="center">
  <img src="https://github.com/user-attachments/assets/cd62b7b5-4eae-4921-8c35-f5184533d888" alt="Alt Text" style="height: 600px; object-fit: contain;">
</p>

------

### Stage 3

The final part, as it enables searching for a larger number of videos. This view is used in the `Home screen`, where users can load more videos on a given topic.

Here, we fetch a larger set of videos, but not all of them are displayed because pagination has not been implemented yet — this is done deliberately to save valuable API tokens. According to the documentation, implementing pagination is quite simple: it only requires passing a parameter retrieved from the previous list to get the next set of results without handling page logic manually.

<p align="center">
  <img src="https://github.com/user-attachments/assets/4bc433d8-5c4a-4393-a678-3692065a5bda" alt="Alt Text" style="height: 600px; object-fit: contain;">
</p>

------
