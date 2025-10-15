# metroid code breaker

an exercise in reverse engineering, web application that generates passwords for the classic Nintendo NES video game Metroid

![preview](https://raw.githubusercontent.com/xero/metroidCodeBreaker/main/img/preview.png)

many years ago, a rom hacker by the name of SnowBro set out to gain an intuitive understanding of the inner workings of the software we lovingly refer to as metroid. using only the rom file, he was able to convert it into [assembly code](http://www.metroiddatabase.com/wp-content/uploads/Metroid/m1source.txt) and learn exactly how the game engine worked.

building off the work SnowBro did many years ago, dirty McDingus disassembled the entire metroid code into [nine different text files](http://www.metroiddatabase.com/wp-content/uploads/Metroid/MetroidSourceCode.zip) documenting the majority of it far more extensively than SnowBro had. there are descriptions for the title page, intro, ending, password, and music. the program can now be edited and reassembled using tools like ophis, making far more sophisticated rom hacks possible.

armed with these files and the knowledge they contained, i set out to build a metroid password generator tool. being a scene kid, i have some experience with keygens already. and with the work of snobro's password explanations and dirty's raw code, i was able to get the job done. all graphics are game sprites i ripped and assembled. it also features my metroid password font [NARPASSWORD](https://fonts.xero.style/fonts/NARPASSWORD00000). who's name is inspired by the debug password which was first discovered by snobro's research.
