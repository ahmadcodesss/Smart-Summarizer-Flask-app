# Smart Summarizer

A full-stack web application that summarizes user-provided text using 
Facebook's BART-large-CNN model via the Hugging Face Inference API.

## About

Smart Summarizer takes a block of text between 100 and 800 words and 
returns a concise, readable summary. The backend is built with Flask 
and exposes a REST API that communicates with the Hugging Face Inference 
API to perform summarization. The frontend is built with vanilla JavaScript 
and handles real-time word count tracking, input validation, and async 
communication with the backend.

## Tech Stack

- **Backend:** Python, Flask, Flask-Limiter, Flask-CORS, python-dotenv
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **API:** Hugging Face Inference API (facebook/bart-large-cnn)

## Features

- Text summarization using BART-large-CNN model
- Real-time word count on input and output
- Client-side and server-side input validation
- Rate limiting (10 requests/minute)
- Automatic sentence capitalization on output
- Async request handling with loading state feedback
