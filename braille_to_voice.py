
import pyttsx3  

def fromBraille(braille_text):
    braille_to_text = {
        '⠀': ' ',  # Braille Pattern Blank (space)
        '⠁': 'a', '⠃': 'b', '⠉': 'c', '⠙': 'd', '⠑': 'e', '⠋': 'f',
        '⠛': 'g', '⠓': 'h', '⠊': 'i', '⠚': 'j', '⠅': 'k', '⠇': 'l',
        '⠍': 'm', '⠝': 'n', '⠕': 'o', '⠏': 'p', '⠟': 'q', '⠗': 'r',
        '⠎': 's', '⠞': 't', '⠥': 'u', '⠧': 'v', '⠺': 'w', '⠭': 'x',
        '⠽': 'y', '⠵': 'z',
        # Add more mappings as needed for other Braille characters
    }

    text = ""
    for braille_char in braille_text:
        if braille_char in braille_to_text:
            text += braille_to_text[braille_char]
        else:
            # Handle unknown Braille characters or special symbols
            text += '?'
    return text


def text_to_voice(text):
    engine = pyttsx3.init()   
    engine.say(text)  
    engine.runAndWait()
    
    
def main():
    braille_text = "⠓⠑⠇⠇⠕"
    print(fromBraille(braille_text))  # Output: "good morning"
    text_to_voice(fromBraille(braille_text))
    
main()