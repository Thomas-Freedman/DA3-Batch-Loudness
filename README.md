# DA3-Batch-Loudness
A function for Soundflow to perform batch loudness analysis in the Dolby Atmos Album Assembler.

Hello! Thank you for checking out our script. We hope it saves you as much time as it has saved us. Please feel free to reach out to us with any feedback or questions at luke@argillamusic.com or tnfreedman@gmail.com. Below is a brief guide on implementing and using the script in its pre-release form.

Best,
Luke and Thomas

## How to Implement

In order to implement this function in your Soundflow account:
Go to the Soundflow app and select the package in the browser where you’d like to save the function
Click “New” and choose the “script” option
Name the script as desired (maybe “Analyze Loudness (Batch)” or something like that)
Copy the contents of the “Source.rtf” file in this folder and paste them into the source section of the newly created script in soundflow
Copy one of the icons in this folder to your clipboard, click at the top of your script on the “click to add icon” field, and paste from clipboard
You can now run the function directly or add it to any deck of your choice!

## Notes on Usage

The function only requires that you have a DA3 project open when you try to run it

The function will analyze loudness for every ADM track in the open project file

The function creates markers at clip boundaries and analyzes the loudness across those markers (as opposed to the clip itself). The results can be most easily viewed in the markers window. Any existing markers will be overwritten.

Usually, the only way the function will fail to work properly is if you unfocus the Album Assembler to do other things on your computer while it is running. Leaving DA3 focused and not touching anything until the function is done is ideal, but it is possible to leave while a track is being analyzed as long as you refocus the DA3 window before the analysis of that track is finished. This generally seems to let the function work successfully, but is still less stable than just leaving the computer alone. 


