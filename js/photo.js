// Dian.org.cn
$(document).ready(function(){
    $('.scroll_content').find('img').each(function(){
        var $this = $(this);
        $this.css('background-image','url('+$this.data('img')+')');
    });

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
    var offset = 450;


    $('.scroll_content').find('img').each(function(){
        var $this=$(this),
            offsetCoords = $this.offset(),
            topOffset = $this.offset().top;
            // console.log('info topOffset: '+ topOffset);

        $window.scroll(function(){
            console.log('info scrolling');
            //sides between top / bottom of the current view
            if((($window.scrollTop() + $window.height()) > topOffset) && 
                (topOffset + $this.height() > $window.scrollTop())){
                console.log('info scroll:'+this+' in this view');

                //flow up
                var nextY = flowupInScroll($this);

                var coords = $this.css('background-position-x')+' ' + nextY + 'px';

                $this.css({backgroundPosition: coords});
            }
        });


    });

    var flowupInScroll= function($this){
        return $this.data('offset') -
        ($window.scrollTop()/$this.data('speed'));
    }

    // var flowupInSpeed = function($this){
    //     var backgroundY = parseInt($this.css('background-position-y').replace(/px/,''));
    //     // console.log(backgroundY);
    //     return backgroundY - $this.data('speed');
    // }

});