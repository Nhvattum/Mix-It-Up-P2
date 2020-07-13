# Mix It Up

## Description:
- This web app allows users to view cocktail recipes, and select specific drinks to store in their FAVORITES list for ease of access. Users can also create "Pantries" to keep track of all the ingredients that they currently have and what ingredients they would like to get.

## User Experience
- As a user, I want to be able to log in in order have my own profile
- As a user, I want to see a list of cocktail recipes and save my favorite ones to my profile so I don't have to search for them every time
- As a user, I want to search by key words such as drink name, ingredient, and first letter of the drink
- As a user, I want to be able to have a list of the liquors/ mixers that I currently have so I can easily see what I can use in my cocktails
- As a user, I want to be able to search for recipes that ONLY use ingredients that I currently have so I know that I will be able to make whatever shows up

## Models and Relationships
![Relationships](/public/images/models_and_relationships.png)

## Wireframe
![Homepage Wireframe](/public/images/homepage_wireframe.png)

## Routes
![Routes](/public/images/routes.png)

## Technology Used
This app was made primarily with JavaScript, HTML, and CSS. The dependencies in this app are:
- "axios": "^0.19.2",
- "bcrypt": "^5.0.0",
- "bootstrap": "^3.4.1",
- "connect-flash": "^0.1.1",
- "connect-session-sequelize": "^7.0.0",
- "dotenv": "^8.2.0",
- "ejs": "^3.1.3",
- "express": "^4.17.1",
- "express-ejs-layouts": "^2.5.0",
- "express-session": "^1.17.1",
- "flash": "^1.1.0",
- "helmet": "^3.23.3",
- "method-override": "^3.0.0",
- "morgan": "^1.10.0",
- "passport": "^0.4.1",
- "passport-local": "^1.0.0",
- "pg": "^8.2.1",
- "sequelize": "^6.2.3",
- "sequelize-cli": "^6.2.0"

## Sources
- This app is based off of the TheCocktailDB API
- The background image came from https://unsplash.com/photos/8UzQG534Rm8. It was posted by Marc-Olivier Paquin (@marco_blackboulevard).
- I learned the code necessary to create a new input on my search page from http://help.dottoro.com/ljxqnpcv.php. The original code was for how to clone a table, but I was able to adapt the code for my needs, and I learned how to do it for myself in the future.

## Other Sources
- I used the Auth Boilerplate that we did in class as the base of this app.
- I used many of our in-class labs and homeworks as references for things like axios calls creating models, writing routes, etc. Some of these assignments were:
    - Blogpulse
    - Pokedex
    - Userapp
- Erik helped me with a lot of different things in TA and in our 1:1s, but most specifically, he helped me write the code that sorts all of the ingredients alphabetically.
- Nick helped me with a lot of debugging and helped me understand some of the more difficult chunks of code I had to write. One example of this is how he helped me convert user input into the format required by my API searches.
- I learned how to replace spaces in user input with an underscore from https://www.developintelligence.com/blog/2016/02/replace-spaces-underscores-javascript/.

## Bugs/Roadblocks Encountered
- I had a hard time understanding how to write routes when I first started making this app.
- I REALLY wanted to be able to search for cocktails using ingredients in the pantry as the search parameters (I even spent 2 days writing the code to do so), but I was never able to achieve this because misunderstood the search capabilities of my API.
- Some of my pages were not able to find images that are stored in the public file for some reason, so I had to find a way around that.
- I wanted to have a search bar on my ingredients page so the user wouldn't have to scroll through hundreds of ingredients, but I was never able to get it to work.
- Bugs were a daily battle with this project

## MVP
- Users will be able to:
    - [x] Log in and create their profile
    - [x] Access hundreds of cocktail recipes, and store them to their favorites list for easy access
    - [x] Create multiple pantries
    - [x] Select which ingredients are currently in each pantry
    
## Stretch Goals
- Users will be able to:
    - [ ] List all cocktails by first letter
https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a
    - [x] Search cocktails by name:
https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
    - [x] Search by base liquor (or ingredient):
https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
- [x] Make a logo

- If I pay for a key, users will be able to:
    - [x] Select which ingredients they currently have
    - [ ] Filter based on the ingredients I currently have
https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Dry_Vermouth,Gin,Anis
    - [ ] List Popular cocktails
https://www.thecocktaildb.com/api/json/v1/1/popular.php
    - [ ] Lookup a selection of 10 random cocktails
https://www.thecocktaildb.com/api/json/v1/1/randomselection.php

## Final Thoughts
Although I wasn't able to implement all of the features I wanted to, I am very proud of what I created in with this project. Working on it is really what helped me understand the concepts that we learned through this unit. There are several chunks of code (even an entire file) that is commented out because I wasn't able to get that specific feature to work, but I left them in because I would like to come back to this project in the future and try to implement those things when I have more experience.

I encountered new bugs EVERY DAY while working on this, and I wouldn't have been able to finish if it weren't for the help that I got from TAs and my peers, but I also learned a lot about how to problem solve for myself.
