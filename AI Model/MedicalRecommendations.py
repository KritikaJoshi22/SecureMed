import requests

# First Model - Image to Text Conversion
API_URL = "https://api-inference.huggingface.co/models/jinhybr/OCR-Donut-CORD"
headers = {"Authorization": "Bearer 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"}

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

# Function to process multiple files and concatenate the image text
def process_files_and_concatenate(file_list):
    concatenated_text = ""
    for filename in file_list:
        output = query(filename)
        image_text = extract_generated_text(output)
        concatenated_text += image_text + " "  # Add a space between texts for separation
    return concatenated_text

# Function to extract 'generated_text' from the response
def extract_generated_text(response):
    if isinstance(response, list):
        return response[0].get('generated_text', "")
    return response.get('generated_text', "")

# List of files to process
files_to_process = ["patient1.png", "patient2.png"]

# Process the files and concatenate the image texts
image_text_concatenated = process_files_and_concatenate(files_to_process)

# Second Model - Analyze Data and Give Relevant Lifestyle Changes
from bardapi import Bard
import os
import requests

token = "ZAjWsC5vzBoKkPu6kqB4Mr--gBxxRhjkkUanHFtpC4YVfd2yxfJ0hVtQZeKmeJgWDi3u4A."
os.environ['_BARD_API_KEY'] = token

session = requests.Session()
session.headers = {
    "Host": "bard.google.com",
    "X-Same-Domain": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Origin": "https://bard.google.com",
    "Referer": "https://bard.google.com/",
}
session.cookies.set("__Secure-1PSID", os.getenv("_BARD_API_KEY"))

bard = Bard(token=token, session=session, timeout=30)

text = '''
data: 
task: {prompt} 
'''
prompt = f"{image_text_concatenated} analyze the given data and give the relevant life-style changes as heading LIFESTYLE:"
text = text.format(prompt=prompt)
summary = bard.get_answer(text)['content']
print(summary.split("LIFESTYLE")[-1])
