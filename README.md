# Team Squash <!-- omit in toc -->

[![Server Build Status](../../actions/workflows/server.yml/badge.svg)](../../actions/workflows/server.yml)
[![Client Build Status](../../actions/workflows/client.yaml/badge.svg)](../../actions/workflows/client.yaml)
[![End to End Build Status](../../actions/workflows/e2e.yaml/badge.svg)](../../actions/workflows/e2e.yaml)

[![BCH compliance](https://bettercodehub.com/edge/badge/UMM-CSci-3601-S21/it-1-squash?branch=main)](https://bettercodehub.com/)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/UMM-CSci-3601-S21/it-1-squash.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/UMM-CSci-3601-S21/it-1-squash/alerts/)

- [:exclamation: Elevator Pitch](#exclamation-elevator-pitch)
- [Development](#development)
  - [Common commands](#common-commands)
- [Deployment](#deployment)
- [Resources](#resources)
- [Contributors](#contributors)

## :exclamation: Elevator Pitch 

Team Squash (Josh Quist, Jacob Jennes, Alica Ellstrom, Elmurad Abbasov) is here to deliver a learning facilitation tool that supports the creation, management, and analysis of student language exploration experiences - Word River. Unlike managing all of this information by hand, our product makes it easy to manage what experiences are available (through the creation, viewing, and assignment of personalized content) and understand more about a learner’s exploration and progress.

From our technical side, we will try to provide the users several different options of how they would like to create and manage word lists. One of our first ideas was to provide an option to build words from the grammar perspective, such as with nouns, verbs, and adjectives. 

For that, we would:

- create word lists in .json format accessible by story builder 
- enable editing of words lists
- allow viewing created word lists in Word River 

For the first iteration, our customers, or mainly teachers, parents, and researchers would have an opportunity to view word lists in Angular in a format similar to story builder, as well as to edit word lists. 

## [Development](DEVELOPMENT.md)

Instructions on setting up the development environment and working with the code are in [the development guide](DEVELOPMENT.md).

### Common commands

From the `server` directory:
- `./gradlew run` to start the server
- `./gradlew test` to test the server

From the `client` directory:
- `ng serve` to run the client
- `ng test` to test the client
- `ng e2e` and `ng e2e --watch` to run end-to-end tests

From the `database` directory:
- `./mongoseed.sh` (or `.\mongoseed.bat` on Windows) to seed the database

## [Deployment](DEPLOYMENT.md)

Instructions on how to create a DigitalOcean Droplet and setup your project are in [the deployment guide](DEPLOYMENT.md).

## [Resources](RESOURCES.md)

Additional resources on tooling and techniques are in [the resources list](RESOURCES.md).

## Contributors

This contributors to this project can be seen [here](../../graphs/contributors).
