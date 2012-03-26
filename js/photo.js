// Dian.org.cn
$(document).ready(function(){
    $('.scroll_content').find('img').each(function(){
        var $this = $(this);
        $this.css('background-image','url('+$this.data('img')+')');
    });

    //for slide scroll
    //group
    $('.layer1').data('speed', 40);
    $('.layer1').data('offset', 90);

    //single1
    $('.layer2').data('speed', 20);
    $('.layer2').data('offset', 500)

    //single2
    $('.layer3').data('speed', 30);
    $('.layer3').data('offset', 700);

    var $window = $(window);

    $('.scroll_content').find('img').each(function(){
        var $this=$(this),
            topOffset = $this.offset().top;
            // console.log('info topOffset: '+ topOffset);

        $window.scroll(function(){
            // console.log('info scrolling');
            //slides between top / bottom of the current view
            if((($window.scrollTop() + $window.height()) > topOffset) && 
                (topOffset + $this.height() > $window.scrollTop())){
                // console.log('info scroll:'+this+' in this view');

                //flow up
                var nextY = flowupInScroll($this);

                var coords = $this.css('background-position-x')+' ' + nextY + 'px';

                $this.css({backgroundPosition: coords});
            }
        });


    });



    //for year scroll
    var startOffset = $window.height() * 0.1;
    $('.year').each(function(){
        var $this=$(this),
            topOffset = $this.offset().top,
            $thisParentBox = $this.parent().parent();
            stopOffset = $thisParentBox.height() + 
                         $thisParentBox.offset().top;
            // console.log('info topOffset: '+ topOffset);

        //hide it
        $this.css('top', '-90px');

        $window.scroll(function(){
            //slides between top / bottom of the current view
            //slides in its parent
            if((($window.scrollTop() + startOffset) > topOffset) && 
                (($window.scrollTop() + startOffset) < stopOffset)){
                //flow up
                flowWithScroll($this);


            }
        });


    });

    var flowupInScroll= function($this){
        var nextY = $this.data('offset') -
        ($window.scrollTop()/$this.data('speed'));
        var coords = $this.css('background-position-x')+' ' + nextY + 'px';
        $this.css({backgroundPosition: coords});
    }
    var flowWithScroll = function($this){
        var top = $window.scrollTop() + startOffset - $this.offset().top;
        $this.css('top', top+'px');

    }

    // var flowupInSpeed = function($this){
    //     var backgroundY = parseInt($this.css('background-position-y').replace(/px/,''));
    //     // console.log(backgroundY);
    //     return backgroundY - $this.data('speed');
    // }

});