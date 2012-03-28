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
    // $('.layer1').data('speed', 40);
    // $('.layer1').data('offset', 90);
    $('.layer1').each(function(){
        var $this = $(this);
        if($this.data('speed') == undefined){
            $this.data('speed', 40);
        }
        if($this.data('offset') == undefined){
            $this.data('offset', 90);
        }
    });

    //single1
    $('.layer2').each(function(){
        var $this = $(this);
        if($this.data('speed') == undefined){
            $this.data('speed', 20);
        }
        if($this.data('offset') == undefined){
            $this.data('offset', 500);
        }
    });

    //single2
    $('.layer3').each(function(){
        var $this = $(this);
        if($this.data('speed') == undefined){
            $this.data('speed', 30);
        }
        if($this.data('offset') == undefined){
            $this.data('offset', 700);
        }
    });

    var $window = $(window);

    $window.scroll(function(){
        if($window.scrollTop() > 800){
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
    var startHeight = $window.height() * 0.3;
    var endOffset = $('.year:last').offset().top;
    $('.year').not(':last').each(function(){
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
            if((($window.scrollTop() + startHeight) > topOffset) && (($window.scrollTop() + startHeight) < stopOffset)){
                //flow up
                console.log(stopOffset);
                flowWithScroll($this);
            }else if ($window.scrollTop() + startHeight < topOffset){
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
        var parentOffsetTop = $this.parent().offset().top;
        var toTop = $window.scrollTop() + startHeight - parentOffsetTop;
        var endTop = endOffset - parentOffsetTop;
        if(toTop > endTop){
            //chrome need 4px more
            $this.css('top', (endTop) + 'px');
            // $this.hide();
        }else{
            $this.css('top', toTop + 'px');
            // $this.show();
        }
    }

});