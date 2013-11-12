square-transition
=================

transition effect for a square from a container to another


How to use
=================

Create a new SquareTransition object and you're done. There are only to paramèters that are required.
The object to start from and the object to go to

    new SquareTransition ({
        from : $('.square-from'),
        to : $('.square-to')
    });


There is also other parameters that can be change, a whole new config can change up to 8 properties


    new SquareTransition ({
        from : $('.square-from'),
        to : $('.square-to'),
        callback : function (){console.log("done");},
        borderColor : '#4d4d4d',
        appendElement : false, // tel if the container from should be append in the square
        coef : -1.6, // coefficiant for the speed of the loop
        scale : 1, // the scale wich the square will have when created
        rotation : 360, // the rotation to do when animating the square from one to another object
        callback : function () // a callback function
        {
            console.log('animation is over');
        }
    });