;(function ()
{
    /**
     *
     * DEPENDENCIES -> jQuery, requestAnimFrame
     */
    this.SquareTransition = (function ()
    {
        /**
         * @param {number} options =>
         *      {jQuery Object} (container) from
         *      {jQuery Object} (container) to
         *      {int} borderColor => default #4d4d4d
         *      {boolean} appendElement, tel if the container from should be append in the square
         *      {int} scale, the scale ratio => default to -1.6
         *      {int} coef, the coef that make the speed of the animation => default 1
         *      {int} rotation, in degree => default 360
         *      {Function} callback, called when the anim is done
         */
        function SquareTransition (options)
        {
            var options = options || {};
            this.$square = null;
            this.clones = [];
            this.options = {
                from : null,
                to : null,
                borderColor : '#4d4d4d',
                appendElement : false,
                coef : -1.6,
                scale : 1,
                rotation : 0,
                callback : null
            };
            $.extend(this.options, options);
            this.startX = this.options.from.offset().left + ((this.options.to.offset().left - this.options.from.offset().left) * .5);
            this.startY = this.options.from.offset().top;
            this.interval = this.options.to.offset().left - this.startX;
            this.options.scaleTo = this.options.to.height() / this.options.from.height();
            this.createSquare();
        }

        /**
         * Create the square
         */
        SquareTransition.prototype.createSquare = function ()
        {
            var self = this,
                translate = 'translate(' + (this.startX + Math.sin(this.options.coef) * this.interval) + 'px,' + (this.startY + Math.cos(this.options.coef) * this.interval) + 'px)';
            this.$square = $(document.createElement("div"));
            this.$square.css({
                width : this.options.from.width() + "px",
                height : this.options.from.height() + "px",
                '-webkit-transform' : translate,
                '-moz-transform' : translate,
                '-o-transform' : translate,
                '-ms-transform' : translate,
                'transform' : translate,
                border : '1px solid ' + this.options.borderColor,
                position : "absolute",
                '-webkit-transform-origin' : '0 0',
                '-moz-transform-origin' : '0 0',
                '-o-transform-origin' : '0 0',
                '-ms-transform-origin' : '0 0',
                'transform-origin' : '0 0'
            });

            if(this.options.appendElement){
                this.$square.append(this.options.from);
                this.options.from.css({margin : 0});
            }
            $('body').append(this.$square);
            var animloop = function ()
            {
                if(self.options.coef < -4.6){
                    if(self.clones.length > 0){
                        self.clones.shift().remove();
                    }
                    else {
                        cancelAnimationFrame(animloop);
                        self.$square.remove();
                        if(self.options.callback) self.options.callback();
                        return;
                    }
                }
                else{
                    var clone = self.$square.clone();
                    self.clones.push(clone);
                    clone.appendTo('body');
                    self.animate();
                }
                requestAnimFrame(animloop);
            };
            animloop();
        };

        /**
         * Create the square
         */
        SquareTransition.prototype.animate = function ()
        {
            var translate = '';
            this.options.scale -= 0.025;
            this.options.coef -= 0.1;
            if(this.options.coef)
                translate += 'translate(' + (this.startX + Math.sin(this.options.coef) * this.interval) + 'px,' + (this.startY + Math.cos(this.options.coef) * this.interval) + 'px) ';
            if(this.options.rotation <= 360)
                translate += 'rotate(' + (this.options.rotation += 12) + 'deg) ';
            if(this.options.scale > this.options.scaleTo)
                translate += 'scale(' + this.options.scale + ',' + this.options.scale + ')';
            if(translate !== '') this.$square.css({
                '-webkit-transform' : translate,
                '-moz-transform' : translate,
                '-o-transform' : translate,
                '-ms-transform' : translate,
                'transform' : translate
            });
        };

        return SquareTransition;

    })();

}).call(this);
