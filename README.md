# Alpha development for Inbox

This repository is made up of multiple prototye projects built for user research
and usability testing.


Each project is self contained, and can be built and deployed individually. We
use a Makefile in each project for this purpose. In addition, there is a top
level Makefile in this root directory that can orchestrate all sub-projects.

To set up and build all projects, run the command

    make setup
    make build

To develop in any given project, check it's local Makefile to be sure -- but generally the following command will start up a development mode.

    make start
