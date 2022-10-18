# Traveler tracker backend: 

https://github.com/william-luck/traveler-tracker

# Description

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cx61fm5yc64autsfhazz.gif)


This application is used for tracking travelers in a country at a given time. Users can scroll through a list of all countries, see the number of travelers in that country, select the country for a list of current travelers, and see the individual visits for the traveler in that country. Additionally, users can see the traveler profile, and there are options to add a new traveler or a new visit for an existing traveler.

Upon loading the application, users see a list of all countries in the database, with badges to indicate the number of travelers currently in that country. Clicking on that country will display a list of travelers currently in that country. 

From there, clicking on the traveler will show all of the traveler's visits in that country, and send their information to the profile tab. The profile tab is disabled by default, but enables once a traveler is selected for the first time. 

Users can edit the name or passport number of the traveler in the profile, but nothing else. This is used as a statistics page. Adding visits for a traveler are done through the add visit tab, where the user can enter the passport number of a traveler to add a visit. Once a matching traveler is found using the passport number, an alert will display on the top of the page for the matching traveler. Adding a visit moves the traveler from the previous country to the country of the new visit. After adding a visit, users are pushed back to the home page. 

Adding a traveler directs the user to the add visit tab, and the passport number is automatically filled in to avoid mistakes in entry. After adding a visit for the new traveler, the user is pushed to the newly created traveler's profile page. 