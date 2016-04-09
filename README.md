# Knock Knock jokes with Jibo
This is the much-improved decendent of my original knock-knock joke skill written at the East Coast Jibo Hackathon on Feb. 6, 2016.

## Current Features
* Jibo tells knock knock jokes and responds to your knock knock jokes
* Jibo walks you through a knock knock joke if you're not familiar with them
* Jibo "doesn't get it" if the joke you tell doesn't contain the setup somewhere in the punchline
* Easily expand the laugh and sorry animation pool just by adding new animations - no coding required
* Knock knock database expandable via csv input
 
## Planned features
* Keep track of which specific users have heard which jokes, avoid repeats
* Keep track of which users know the joke protocol, and don't ask if they know
* Turn help back on if the user has trouble with the joke protocol
* Learn jokes from the users (yes, I know I need to be careful with this one!)
* Update jokes from a web resource
* Keep adding more jokes
* Keep adding more animations
* Assess whether a joke is good or not, rate jokes by quality

## Known bugs
* On the second pass through the tell/hear cycle, Jibo starts listening to a joke, then skips to telling a joke. This is due to a known SDK bug that is currently being worked by the SDK team. The 'flatten-some-subtrees' branch contains a work-around for this bug.
* Every other time Jibo doesn't get your joke, he doesn't play a "sorry" animation. This is due to the same SDK bug. The 'flatten-some-subtrees' branch contains a work-around for this bug.


##Joke sources:
http://dailyjokes.somelifeblog.com/search/label/Knock-Knock
http://www.funology.com/knock-knock-jokes/
http://www.jokes4us.com/knockknockjokes/
