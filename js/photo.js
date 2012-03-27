// Dian.org.cn
$(document).ready(function(){

    $("#arrive_date").datepicker();
    $("#return_date").datepicker();

    $('.scroll_content').find('img').each(function(){
        var $this = $(this);
        $this.css('background-image','url('+$this.data('img')+')');
    });

    //let ie go to hell
    if($.browser.msie){
        return true;
    }

    //hide nav item
    $('a[href="#first"]').parent().addClass('hide');
    $('#nav').addClass('at_top');

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

    $window.scroll(function(){
        if($window.scrollTop() > $window.height()){
            $('a[href="#first"]').parent().removeClass('hide');
            $('#nav').removeClass('at_top');
        }else{
            $('a[href="#first"]').parent().addClass('hide');
            $('#nav').addClass('at_top');
        }
    });

    $('.scroll_content').find('img').each(function(){
        var $this=$(this),
        topOffset = $this.offset().top;
            // console.log('info topOffset: '+ topOffset);

            $window.scroll(function(){
            // console.log('info scrolling');
            //slides between top / bottom of the current view
            if((($window.scrollTop() + $window.height()) > topOffset) && 
                (topOffset + $this.height() > $window.scrollTop())){
                //flow up
                flowupInScroll($this);
            }
        });
    });

    //for year scroll
    var startOffset = $window.height() * 0.3;
    $('.year').each(function(){
        var $this=$(this),
        topOffset = $this.offset().top,
        $thisParentBox = $this.parent().parent().parent(),
        stopOffset = $thisParentBox.height() + 
        $thisParentBox.offset().top;
            // console.log('info topOffset: '+ topOffset);

        //hide it
        // $this.css('top', '-90px');

        $window.scroll(function(){
            //slides between top / bottom of the current view
            //slides in its parent
            if((($window.scrollTop() + startOffset) > topOffset) && (($window.scrollTop() + startOffset) < stopOffset)){
                //flow up
                console.log(stopOffset);
                flowWithScroll($this);
            }else if ($window.scrollTop() + startOffset < topOffset){
                $this.css('top', '0px');
            }
        });
    });

    var flowupInScroll= function($this){
        var nextY = $this.data('offset') - ($window.scrollTop()/$this.data('speed'));
        var coords = $this.css('background-position')
        .replace(/ .*(px)/i, ' '+nextY+'$1');

        $this.css('background-position', coords);
    }
    var flowWithScroll = function($this){
        var top = $window.scrollTop() + startOffset - $this.parent().offset().top;
        $this.css('top', top+'px');
    }

});