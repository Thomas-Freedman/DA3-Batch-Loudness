Changelog

V2.0.6
July 13th, 2024
Changed the timeout timeout period to be longer to allow for longer analysis times
Added logs for number of tracks processed and processing time for each to monitor for future errors

V2.0.5
June 21st, 2024
Changed the timeout timeout period to be longer to allow for longer analysis times

V2.0.4
June 21st, 2024
No major changes; comments and organization

V2.0.3
June 21st, 2024
Removes need for user input at the beginning, as the function now determines number of tracks on its own
Now strictly an "analyze all" function

V2.0.2
June 21st, 2024
No major changes; comments and organization

V2.0.1
June 20th, 2024
Names all markers based on clip names

V2.0.0
June 20th, 2024
Completely overhauls the function with new mechanism of operation in which markers are created 1 by 1 and analyzed
Removes time dependency of scrolling mechanism, so practically all erratic behavior is eliminated
Analyzes tracks from last to first
Will work best for intended use of analyzing ALL tracks in a session; may not behave as intended if analyzing only some
Will overwrite existing song markers

V1.0.2
June 9th, 2024
Function now autoscrolls to the top of markers window before starting analysis to avoid operation errors
Fixed bug where cancel button on initial popup just reopened the popup

V1.0.1
April, 2024
Added scrolling mechanism to allow for batch analysis of a (theoretically) indefinite number of tracks
Tested for up to 50 tracks

V1.0.0
April, 2024
Basic implementation for batch analyzing loudness of up to 10 songs with clicking mechanism; no scrolling.

