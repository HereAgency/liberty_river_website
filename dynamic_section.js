$(document).ready(function () {
  //SELECTORS & VARIABLES FOR MOBILE SECTION:
  
  $(".section-wrap-mobile #text-1").show();
  var allPanels = $(".section-wrap-mobile [id*='text-']").hide();
  var allLines = $(".section-wrap-mobile .divider-line");
  var allLabels = $(".section-wrap-mobile button");
  var MOBILE_previousPanel = ".section-wrap-mobile #text-";
  var $MOBILE_previousId = 1;
  var $MOBILE_newId = 0;
  const $MOBILE_line = ".section-wrap-mobile #line-";
  //SELECTORS & VARIABLES FOR DESKTOP SECTION:
  document.querySelector(".section-wrap-desktop #text-1").style.display = "block";
  var $DESK_previousId = 1;
  var $DESK_newId = 0;
  
  const $DESK_supItem = ".section-wrap-desktop #supItem-";
  const $DESK_item = ".section-wrap-desktop #item-";
  const $DESK_text = ".section-wrap-desktop #text-";
  
  //Check size of the screen:
  var mqMobile = window.matchMedia("(max-width: 768px)");
  checkMediaSize(mqMobile); // Call listener function at run time
  mqMobile.addListener(checkMediaSize); // Attach listener function on state changes

  function checkMediaSize(mqMobile) {
    // IF MEDIA IS MOBILE:
    if (mqMobile.matches) {
      //SHOW ONLY MOBILE SECTION
      $(".section-wrap-mobile").show(10);
      $(".section-wrap-desktop").hide(10);
      //WHEN CLICK ON AN ITEM, SLIDE UP THE PREVIOUS ONE AND SLIDE DOWN THE NEW ONE:
      allLabels.click(function () {
        $MOBILE_newId = +document.getElementById(this.id).value;
        if ($MOBILE_newId != $MOBILE_previousId){
          //Show the text
          allPanels.slideUp();
          allLabels.css("opacity", "0.65");
          
          // $(MOBILE_previousPanel + $MOBILE_previousId + "").slideUp();
          $(this).parent().next().slideDown();
          $(this).css("opacity", "1");
          
          //Show the dividers lines
          allLines
            .removeClass("displayed-line")
            .addClass("hidden-line");
          
          var secondLineId = $MOBILE_newId+1;
          
          $($MOBILE_line + $MOBILE_newId)
            .removeClass("hidden-line")
            .addClass("displayed-line");
          
          $($MOBILE_line + secondLineId)
            .removeClass("hidden-line")
            .addClass("displayed-line");
        }
        
        $MOBILE_previousId = $MOBILE_newId;
        return false;
      });
    }
    
    //IF MEDIA IS DESKTOP:
    else {
      //SHOW ONLY DESKTOP SECTION:
      $(".section-wrap-desktop").show(10);
      $(".section-wrap-mobile").hide(10);
      
      //ANIMATION: When click on item, fade away the previous one and highlight the new one:
      $(".section-wrap-desktop button").click(function() {
        //Avoid animation starts before the previous one is completely finished:
        if ($(":animated").length) {
          return false;
        }
        else {
          $DESK_newId = +document.getElementById(this.id).value;

          //ANIMATION SUP NUMBER
          if ($($DESK_supItem + $DESK_previousId + "").hasClass("highlightedSup")) {
            $($DESK_supItem + $DESK_previousId + "")
              .removeClass("highlightedSup")
              .addClass("hiddenSup");
          }

          if ($($DESK_supItem + $DESK_newId + "").hasClass("hiddenSup")) {
            $($DESK_supItem + $DESK_newId + "")
              .removeClass("hiddenSup")
              .addClass("highlightedSup");
          } 
          else {
            $($DESK_supItem + $DESK_newId + "").toggleClass("highlightedSup");
          }

          //ANIMATION ITEM NAME
          if ($($DESK_item + $DESK_previousId + "").hasClass("highlightedItem")) {
            $($DESK_item + $DESK_previousId + "")
              .removeClass("highlightedItem")
              .addClass("hiddenItem");
          }

          if ($($DESK_item + $DESK_newId + "").hasClass("hiddenItem")) {
            $($DESK_item + $DESK_newId + "")
              .removeClass("hiddenItem")
              .queue(function () {
                $($DESK_item + $DESK_newId + "")
                  .addClass("highlightedItem")
                  .dequeue();
              });
          }
          else {
            $($DESK_item + $DESK_newId + "").toggleClass("highlightedItem");
          }

          // ANIMATION TEXT DESCRIPTION
          if ($DESK_previousId != $DESK_newId) {
            $($DESK_text + $DESK_previousId + "")
              .fadeToggle(250)
              .queue(function () {
                $($DESK_text + $DESK_newId + "")
                  .fadeToggle(500)
                  .dequeue();
              });
          }
          
          //SAVE ID FOR THE NEXT CLICK:
          $DESK_previousId = $DESK_newId;
        }
      });
    }
  }
  
});
