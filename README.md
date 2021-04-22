# CSE416 Software Engineering Project

[![Gatsby Build Test](https://github.com/janarosmonaliev/project-416/actions/workflows/gatsby-test-master.yml/badge.svg?branch=master)](https://github.com/janarosmonaliev/project-416/actions/workflows/gatsby-test-master.yml)

### Development

Introductory information for getting started is located at [CONTRIBUTING.md](CONTRIBUTING.md)  
Project progress and changelog can be tracked at [CHANGELOG.md](CHANGELOG.md)

## About Our Team:

### Team: KGB (Kuhn the General Boss)

Project Manager: Yejin Shin - yejin.shin@stonybrook.edu <br />
Lead Programmer: Zhanarbek Osmonaliev - zhanarbek.osmonaliev@stonybrook.edu <br />
Product Owner: Hasung Jun - hasung.jun@stonybrook.edu <br />
Designer: Fabio Calero - fabio.calero@stonybrook.edu <br />

## Target User:

An individual user who wants to increase his browser workflow productivity. It can be a student or a professional who wishes to organize bookmarks and personalize their browser homepage.

## Problem Statement:

Safari and Chrome have very limited options for managing and organizing bookmarks. When the user adds bookmarks, they usually appear unorganized and spread without any meaningful layout.

## Solution:

Our solution is to create a webpage that serves as a startup page on any internet browser. This webpage will allow users to manage their bookmarks by categorizing them into folders. The webpage will also contain widgets for notes, to-do lists, and weather. Users need to sign up to save their bookmarks, notes, and settings.

<img width="1440" alt="Screen Shot 2021-04-22 at 12 10 50 PM" src="https://user-images.githubusercontent.com/59468036/115650472-37040700-a364-11eb-99b5-5fe15cef8b2f.png">

## Track Bugs:

Every team member has a responsibility to report the bug they have encountered. The team will benefit from minimizing possible bugs at the developing level from the user's unexpected action to deliver a better service to external testing users in beta test. 

### Test
Each team member SHOULD test enough and implement a proper error handler before merging with the master. These are possible testing methods:

1. Do exactly the opposite of your expectation <br />
Ex) If you implement the "add note" function, delete all the notes and check it works properly.

2. Build up your implementation <br />
Ex) If you finished implementing the "add Todolist" function, combine and test it with previous functions to check whether it works properly without breaking other functions or giving conflicts with recent functions that you implemented. 

3. Intentaionlly gives an error <br />
Ex) If you finished implementing the "add Todolist" function, give an empty name to a todolist.

### Bug Report

Every team member should open an issue on Github if they encounter a bug. They should be all frequently check an issue to give quick feedback.

Allowing email notification will help to give and receive feedback.
![Screen Shot 2021-04-22 at 12 40 55 PM](https://user-images.githubusercontent.com/59468036/115654229-a7faed00-a36b-11eb-96d6-81ceed84654a.png)

A team member who is in charge of the bugged function should fix it.

These are the steps to open an issue:
1. A team member found a bug in a task that he or she wasn't responsible for.
2. Go to the "issues" section on Github.
3. Make a new issue.
4. Explain in as much detail as possible under what circumstances the bug occurred in a word or image.

A team member who is in charge of such a task should fix the bug. He or she has to fix the bug as soon as possible. However, when a bug could have occurred due to some other team member's push, team members should communicate with each other thoroughly to fix the bug together. 

A team member who fixed a bug should comment on how did he or she fixed a bug to prevent similar bugs in the future. 



Last Modified: 22/04/2021 1:02 PM
