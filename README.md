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
- REST API with a dedicated POST route that accepts and returns JSON
- Cross-Origin Resource Sharing (CORS) configured to allow cross-origin requests
- Client-side and server-side input validation rejecting empty and out-of-range inputs (100-800 words)
- Rate limiting to throttle requests to 10 per minute per IP address
- Real-time word count tracking on both input and output fields
- Automatic sentence capitalization applied to summarized output
- Async request handling with loading state and error feedback
