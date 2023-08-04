# speech -> text

import speech_recognition as sr
r=sr.Recognizer()

microphone = sr.Microphone()


def toBraille(c):
    unic = 0x2800  # Unicode code point for Braille Pattern Blank
    mapping = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)="
    i = mapping.index(c.upper())
    if i > 0:
        unic += i
        return chr(unic)
    if i == 0:
        return '_'
    if i < 0:
        return '?'

def converter(txt):
    tmp = ""
    for x in txt:
        tmp += str(toBraille(x))
    return tmp


def voice_to_braille(txt):
    return (converter(txt))



def say_now():
    print('Please talk now!')
    with microphone as source:
        audio_data=r.record(source,duration=10)
        print('Recognizing..')
        text=r.recognize_google(audio_data)
        return text

def main_speech_to_braille():
    print(voice_to_braille(say_now()))
    
main_speech_to_braille()