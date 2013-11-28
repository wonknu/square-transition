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
                appendElement : false,
                coef : -1,
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
            var self = this, animloop, counter = 1500;
            this.$square = $('<div class="wrapper-square"><div class="square"></div></div>');
            $('.square').css({
                width : this.options.from.width() + "px",
                height : this.options.from.height() + "px"
            });
            this.$square.css({
                width : this.options.from.width() + "px",
                height : this.options.from.height() + "px",
                top : this.options.from.offset().left + 'px',
                left :this.options.from.offset().top + 'px'
            });

            if(this.options.appendElement){
                this.$square.append(this.options.from);
                this.options.from.css({margin : 0});
            }
            $('body').append(this.$square);
            this.$square.css(
                {
                    width : this.options.to.width() + "px",
                    height : this.options.to.height() + "px",
                    top : this.options.to.offset().top + 'px',
                    left :this.options.to.offset().left + 'px'
                },
                counter,
                function () {}
            );
            $('.square').addClass('rotated');
            animloop = function ()
            {
                if((counter-=18) < 650){
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
                    var clone = $('<div class="clone-wrapper-square"><div class="clone-square"></div></div>');
                    clone.css({
                        width   : self.$square.css('width'),
                        height  : self.$square.css('height'),
                        top     : self.$square.css('top'),
                        left    : self.$square.css('left')
                    });
                    clone.find('.clone-square').css({
                        '-moz-transform':self.$square.find('.square').css('-moz-transform'),
                        '-webkit-transform':self.$square.find('.square').css('-webkit-transform'),
                        '-o-transform':self.$square.find('.square').css('-o-transform'),
                        '-ms-transform':self.$square.find('.square').css('-ms-transform')
                    });
                    //clone.find('clone-square').css(self.$square.find('.square').css());
                    self.clones.push(clone);
                    clone.appendTo('body');
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
            if(this.options.scale >= this.options.scaleTo)
                this.options.scale -= 0.005;
            this.options.coef -= 0.1;
            if(this.options.coef)
                translate += 'translate(' + (this.startX + Math.sin(this.options.coef) * (this.interval)) + 'px,' + (this.startY + Math.cos(this.options.coef) * (this.interval * .2)) + 'px) ';
            //if(this.options.rotation <= 360)
                translate += 'rotate(' + (this.options.rotation += 11) + 'deg) ';
            //translate += 'scale(' + this.options.scale + ',' + this.options.scale + ')';
            if(translate !== '') this.$square.css({
                '-webkit-transform' : translate,
                '-moz-transform' : translate,
                '-o-transform' : translate,
                '-ms-transform' : translate,
                'transform' : translate,
                width : this.$square.width() * this.options.scale,
                height : this.$square.height() * this.options.scale
            });
        };

        return SquareTransition;

    })();

}).call(this);
