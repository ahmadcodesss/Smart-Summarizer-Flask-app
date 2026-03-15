import os
from huggingface_hub import InferenceClient

def summarize_text(text):
    token = os.getenv('HF_TOKEN')
    
    if not token:
        raise Exception("HF_TOKEN not found")
    
    client = InferenceClient(
        provider="hf-inference",
        api_key=token
    )
    
    try:
        result = client.summarization(
            text,
            model="facebook/bart-large-cnn"
        )
        
        if not result or not result.summary_text:
            raise Exception("Empty response from model")
        
        return result.summary_text
    
    except Exception as e:
        print("Model error:", e)
        raise Exception("Summarization failed")