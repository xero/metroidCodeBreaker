# Metroid Code Breaker

An exercise in reverse engineering, a web application (html5, css3, & es6 js) that generates passwords for my all time favorite Nintendo NES video game Metroid.

![preview](https://raw.githubusercontent.com/xero/metroidCodeBreaker/main/ui/img/preview.png)

# https://xero.github.io/metroidCodeBreaker/

Many years ago, a rom hacker by the name of SnowBro set out to gain an intuitive understanding of the inner workings of the software we lovingly refer to as metroid. Using only the rom file, he was able to convert it into [assembly code](http://www.metroiddatabase.com/wp-content/uploads/Metroid/m1source.txt) and learn exactly how the game engine worked.

Building off the work SnowBro did many years ago, Dirty McDingus disassembled the entire metroid code into [nine different text files](http://www.metroiddatabase.com/wp-content/uploads/Metroid/MetroidSourceCode.zip) documenting the majority of it far more extensively than SnowBro had. There are descriptions for the title page, intro, ending, password, and music. The program can now be edited and reassembled using tools like ophis, making far more sophisticated rom hacks possible.

Armed with these files and the knowledge they contained, I set out to build a Metroid password generator tool. Being a scene kid, I have experience with keygens already. And with the work of SnoBro's password explanations and Dirty's raw code, I was able to get the job done in [flash/actionscript3](https://code.x-e.ro/metroidCodeBreaker-AS3) of all things. Years after Apple killed off that technology, I decided to revive this project for the current web. All graphics are game sprites I ripped and assembled. It also features my Metroid password font [NARPASSWORD](https://fonts.xero.style/fonts/NARPASSWORD00000). Who's name is inspired by the debug password which was first discovered by SnoBro's research.

```
 .___.   metroid code breaker
/  @  \  MMXXV xero harrison
\ @ @ /  https://lab.x-e.ro
 {'^'}   licensed CC0/public domain
```
