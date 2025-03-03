function ensureWindowFocus() { // Ensures the song markers window is focused
    sf.ui.app("com.dolby.AtmosAlbumAssembler").windows.whoseTitle.is("Song markers").first.mouseClickElement({
        relativePosition: { "x": 100, "y": 10 },
        anchor: "TopLeft",
        onCancel: "Continue",
        onError: "Continue",
    });
}

function setMouseCenter() { // Centers the mouse on the song markers window before scrolling
    var frame = sf.ui.app("com.dolby.AtmosAlbumAssembler").windows.whoseTitle.is("Song markers").first.frame;

    // Calculate the center of the window
    var centerX = frame.x + frame.w / 2;
    var centerY = frame.y + frame.h / 2;

    // Move the mouse to the center of the song markers window
    sf.mouse.setPosition({
        position: {
            x: centerX,
            y: centerY,
        },
    });
}

function scrollToTop() { //Scroll to reach the top of the song markers window
    ensureWindowFocus();
    setMouseCenter();

    for (let i = 0; i < 20; i++) {
        sf.mouse.scroll({
            unit: "Line",
            delta: 5
        });
        sf.wait({ intervalMs: 50 }); //Wait briefly between scroll attempts
    }
}

function getTrackInfo(x, y, names) { //Deletes a marker using the markers window and adds marker names to names array 
    const markersWindow = sf.ui.app("com.dolby.AtmosAlbumAssembler").windows.whoseTitle.is("Song Markers").first;

    if (!markersWindow.exists) { //open markers window
        sf.keyboard.press({
            keys: "cmd+slash",
        });
    }

    scrollToTop(); //make sure markers window is scrolled to top

    let currName = "foo"; //currName just needs to not be empty for first loop
    let i = 0;

    while (currName != "") { //loops until there are no more markers (should always work because a file cannot have an empty name)
        sf.clipboard.setText({
            text: "",
        })

        sf.ui.app("com.dolby.AtmosAlbumAssembler").windows.whoseTitle.is("Song markers").first.mouseClickElement({ //Copy name from marker
            relativePosition: { "x": x, "y": y },
            anchor: "TopLeft",
        });

        sf.ui.app("com.dolby.AtmosAlbumAssembler").windows.whoseTitle.is("Song markers").first.mouseClickElement({
            relativePosition: { "x": x + 30, "y": y },
            anchor: "TopLeft",
        });

        sf.keyboard.press({
            keys: "cmd+a",
        });

        sf.keyboard.press({
            keys: "cmd+c",
        });

        names[i] = sf.clipboard.getText().text;
        currName = sf.clipboard.getText().text;
        //log(names[i]);

        sf.ui.app("com.dolby.AtmosAlbumAssembler").windows.whoseTitle.is("Song markers").first.mouseClickElement({ //Delete i-th marker
            relativePosition: { "x": x, "y": y },
            anchor: "TopLeft",
        });

        sf.keyboard.press({
            keys: "backspace",
        });

        sf.keyboard.press({
            keys: "return",
        });

        i++;
    }

    names.pop(); //Remove the last empty name and the "End Marker" name which somehow copies
    names.pop();
    const numTracks = i - 2; //Number of tracks is number of loop iterations minus last two 

    sf.keyboard.press({ //close marker window
        keys: "cmd+slash",
    });

    if (numTracks <= 0) {   //error case of zero tracks
        throw new Error("No tracks to analyze.");
    }
    
    log("Number of tracks to process: " + String(numTracks));

    return numTracks;
}

function goToLastTrack(numTracks) { //Moves playhead to end of last track
    sf.keyboard.press({ //Case of playhead to the right of last tack
        keys: "alt+left",
    });

    for (let i = 0; i <= numTracks + 1; i++) {
        sf.keyboard.press({
            keys: "alt+right",
        });
    }
    return;
}

function main() {
    sf.ui.app('com.dolby.AtmosAlbumAssembler').appActivate(); //Activate DA3

    sf.ui.app('com.dolby.AtmosAlbumAssembler').menuClick({ //Insert markers for all clips
        menuPath: ["Timeline", "Insert Markers at Dolby Atmos Clip Boundaries"],
    });
    sf.keyboard.press({
        keys: "return",
    });

    let names = [];

    const numTracks = getTrackInfo(30, 80, names); // Delete markers, save names and number of tracks

    goToLastTrack(numTracks); //Move playhead to end of last track

    //Analyze tracks
    sf.ui.app('com.dolby.AtmosAlbumAssembler').menuClick({ //Add end marker
        menuPath: ["Timeline", "Insert End Marker at Playhead"],
    });

    for (let i = 0; i < numTracks; i++) {

        let startTime = Date.now(); //log start time for each analysis repetition

        //Insert new marker one track to the left
        sf.keyboard.press({
            keys: "alt+left",
        });

        sf.ui.app('com.dolby.AtmosAlbumAssembler').menuClick({
            menuPath: ["Timeline", "Insert Start Marker at Playhead"],
        });

        //Name marker from names list
        sf.clipboard.setText({
            text: names[numTracks - i - 1],
        });

        sf.keyboard.press({
            keys: "cmd+v"
        });

        sf.keyboard.press({
            keys: "return",
        });

        //Analyze loudness at that marker
        sf.ui.app("com.dolby.AtmosAlbumAssembler").mainWindow.mouseClickElement({
            relativePosition: { "x": 750, "y": -60 },
            anchor: "BottomLeft",
            onCancel: "Continue",
            onError: "Continue",
        });

        // Wait for the analysis to complete
        sf.ui.app("com.dolby.AtmosAlbumAssembler").windows.whoseTitle.is("Analyzing Loudness").first.elementWaitFor({
            waitType: "Disappear", timeout: 1e+9
        });
        
        let elapsedTime = (Date.now() - startTime)/60000; //calculate time it took to analyze each track
        log("Analysis for track " + String(numTracks-i) + " completed. Time (min): " + String(elapsedTime))
    }
}

main();


