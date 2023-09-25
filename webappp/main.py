from flask import Flask, request, jsonify, render_template,send_file

app = Flask(__name__)

from flask_cors import CORS
CORS(app)

# Route for the home page (to render the HTML template)
@app.route('/')
def home():
    return render_template('home.html')  # You can replace 'index.html' with your actual HTML template file

setlang=None
@app.route('/set_language', methods=['POST'])
def set_language():
    global setlang

    # Get the language data from the JSON request
    language_data = request.get_json()

    if 'language' in language_data:
        # Set the setlang variable to the chosen language
        setlang = language_data['language']
        return jsonify({"message": "Language set successfully"}), 200
    else:
        return jsonify({"error": "Invalid language data"}), 400

# Route for audio processing
@app.route('/process_audio', methods=['GET','POST'])
def process_audio():
    # Here, you can add the logic to process the audio and return the transcription
    # You can save the transcription in the backend for later use
    # Replace this with your actual audio processing logic
    transcription = "This is a sample transcription"
    
    return jsonify({'aiResponse': transcription})

# Route for answering questions
@app.route('/process_answer', methods=['GET','POST'])
def process_answer():
    # Retrieve the transcribed question from the request
    data = request.get_json()
    transcribed_question = data.get('aiResponse')

    # Here, you can add the logic to generate the answer audio and text
    # Replace this with your actual answer processing logic
    # You can also have the AI-generated text and isUser information
    answer_text = "This is the AI-generated text."
    is_user = False

    # Send the audio file to the React app using send_file
    return jsonify({'text':answer_text,'isUser':is_user})

@app.route('/get_audio',methods=['GET','POST'])
def get_audio():
    audio_file = r'F:\Music\AUDIO\EDM\Major Lazer Believer.mp3'
    return send_file(audio_file,mimetype='audio/mpeg')

if __name__ == '__main__':
    app.run(debug=True)
