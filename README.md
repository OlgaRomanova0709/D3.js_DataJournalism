# Challenge Description
# Data Journalism and D3

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

 
I was tasked with analyzing current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand the findings.

To eliscit health risks facing particular demographics I sifted through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

Data set: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml). The current data set incldes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

## My Task

Using D3 techniques, I created a scatter plot that represents each state with circle elements. I coded this graphic in the `app.js`  (using `data.csv` sorce) by using the `d3.csv` function. 

![scatter](Images/final.png)

I placed labels in our scatter plot and gave them click events so that users can decide which data to display. I animated the transitions for our circles' locations as well as the range of our axes. It was done for three risk factors (Obesety, Smoking and Lacking Healthcare) for each axis. And I made a choice of x parameter (In Poverty, Age(Median) and Household Income (Median)). Finaly, there are 6 plots with incorporated d3-tips (I use `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged))

I used `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in my web browser.
