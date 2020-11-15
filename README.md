# OpenWorkEngine

[![Build Status](https://travis-ci.com/OpenWorkShop/OpenWorkEngine.svg?branch=master)](https://travis-ci.com/OpenWorkShop/OpenWorkEngine)

Monorepo containing NPM packages and core libraries for OpenWorkShop

## ./npm-packages

All packages are written with `Typescript` and use `yard`.

### lib

React + Redux + GraphQL based API calls and core functionality for interacting with OpenWorkShop servers.

### ui

Opinionated MaterialUI-based implementation of common components, making OWS integration easier.

### open-controller

Component used by widgets to interact with the controller backend.

### G-Wiz

Gcode visualizer and project planner.

## ./open-controller

Core C# library (and docker image) for controlling any kind of machine (CNC, 3DP, etc.)
