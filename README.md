# Chapter2Lecture_Web

A web interface for Chapter2Video — Multi-Agent AI Video Generation Pipeline.

## Features

- Landing page for the Chapter2Video tool
- Visitor rating system with persistent storage
- Chapter conversion request form

## Setup

### Setup for GitHub Pages (100% Free)

#### 1. **Conversion Requests** → JSON File + localStorage

Conversion requests are saved to `conversions.json` and stored in visitor's localStorage.

- Form submissions save to **localStorage** on each visitor's browser
- Export data to JSON by opening browser DevTools > Application > LocalStorage > Copy `chapter2video_conversions`
- Manually update `conversions.json` with new requests and commit to GitHub

**File location:** `/conversions.json`

#### 2. **Ratings** → JSON File + localStorage

Ratings are stored in `ratings.json` and displayed as live statistics.

- New ratings are saved to **localStorage** on each visitor's browser
- The stats display reads from `ratings.json` to show the overall community ratings
- Manually collect localStorage data and update `ratings.json`

**File location:** `/ratings.json`

### How to Export Data from Visitors

1. Open the website and submit a form/rating
2. Open DevTools: `F12` or `Right-click > Inspect`
3. Go to `Application` > `LocalStorage` > Select your site
4. Find `chapter2video_conversions` or `chapter2video_ratings`
5. Copy the JSON data
6. Update the corresponding JSON file in your repo and commit

Both `conversions.json` and `ratings.json` are committed to GitHub and serve as your persistent database.

## Hosting on GitHub Pages

This project is designed for static hosting on GitHub Pages (`username.github.io`). 

- **Completely free** - No external services needed
- **Conversion form** saves to localStorage + `conversions.json` 
- **Ratings** saved to localStorage + `ratings.json`
- You manually pull data from visitor browsers and update JSON files

## Local Development

Open `index.html` in your browser for local testing. Fill in forms and they'll save to your browser's localStorage immediately.

# Project Documentation

## Features
- **Content Section**: Displays the original chapter, PowerPoint presentation, and video.
- **Cumulative Ratings Graph**: Shows a bar chart of cumulative ratings for the content.

## How to Use
1. Open the website.
2. Explore the content section to view or download the chapter, PPT, and video.
3. View the cumulative ratings graph to see the overall feedback on the content.

## Setup Chart.js
1. The cumulative ratings graph uses the Chart.js library.
2. The library is included via a CDN in the `index.html` file.
3. Update the `data` array in `js/main.js` with actual ratings data.

## Files
- `index.html`: Contains the structure for the content section and ratings graph.
- `js/main.js`: Handles the logic for displaying the cumulative ratings graph using Chart.js.
