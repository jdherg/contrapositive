# Contrapositive

### A [contra dance](https://en.wikipedia.org/wiki/Contra_dance) visualization system
====

Features
--------

* Sets of multiple dancers
* Dances contain many Moves
* A Move is composed of one or more Actions
* Dances determine the current Move based on the count passed in

Setup
-----

`python -m http.server`

Tests
-----

localhost:8000/test/SpecRunner.html


TODO
----

* Change positions fluidly when out at top/bottom
* Multiple sets
* Move.defaultAction
* Figure out what to do about previousAction across moves
* Pull render loop out of index.html
* Progression mid-dance
* Fix axis formatting