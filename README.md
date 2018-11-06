# KualiChallenge

This repo is a challenge that I am doing for Kuali Co. I am begining today, November 6th 2018, at 5:00 am.

Set up React. My reasoning here is that by using react's built in framework that I can use lifecycle methods to help save time. My plan is to set up a parent controller component that will set up the building and control the elevators. Then we will have individual elevator components. I would like to include setTimeouts to allow for interactivity.

Design is as follows: There is a controller which takes in requests, verifies that they are good, and runs the logic on which elevator should be ran and sends a command to the elevator. The elevators are responsible to update the controller on all of their current status as well as executing the commands by running a move function recursively.

My one main concern with my design is that the state is constantly being reported by the elevator to its parent component, which is anti-pattern in react. I want to spend more time deeply pondering the best way to handle state in this application.

