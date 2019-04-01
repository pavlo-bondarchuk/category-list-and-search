$("#search").hideseek({
 nodata: "No results found",
 highlight: true,
 navigation: true
});
$('[href="#"]').click(function(e) {
  e.preventDefault();
});
(function($) {
  //declare plugin methods
  let methods = {
    init: function(options) {
      let settings = $.extend($.fn.filtering.carry, { filter: "*" }, options);
      return this.each(function() {
        $this = $(this);

        //implement functionality
        if (settings.itemSelector) {
          let $items = $this.find(settings.itemSelector);
          let parentHeight = 0;
          $items.each(function(i, el) {
            let $el = $(el);
            if ($el.is(settings.filter)) {
              $el.removeClass('hide')
              $el.css({display:'block',height: 'auto', opacity: 0}).stop().animate({opacity: 1},700);
              parentHeight += $el.outerHeight();
            } else {
              $el.addClass('hide');
              $el.stop().animate({opacity: 0},0, function(){$el.css({height: '0px', display:'none'})});
            }
          });
          //$this.stop().animate({'height':`${parentHeight }`},800,function(){$this.css({height:'auto'})});
        } else {
          $.error("itemSelector hasnt been defined");
        }
      });
    }
  };
  //attaching plugin
  $.fn.filtering = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("There is no method with the name of" + method);
    }
  };
  //create default not resetting settings
  $.fn.filtering.carry = { itemSelector: "" };
})(jQuery);
(function() {
  let $grid = $(".article-list").filtering({ itemSelector: ".article-item" });
  //add filtering
  $(".filter a").click(function() {
    $(this)
      .closest(".filter")
      .find("li.active")
      .removeClass("active");
    $(this)
      .closest("li")
      .addClass("active");
    $grid.filtering({ filter: $(this).data("filter") });
  });
})();
