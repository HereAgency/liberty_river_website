$(document).ready(function () {


  //SELECTORS & VARIABLES FOR MOBILE SECTION:
  var allPanels = $(".section-wrap-mobile [id*='text-']").hide();
  $(".section-wrap-mobile #text-1").show();
  // $(".section-wrap-mobile #line-1").css('opacity', '1');
  // $(".section-wrap-mobile #line-2").css('opacity', '1');
  var allLines = $(".section-wrap-mobile .divider-line");
  var MOBILE_previousPanel = ".section-wrap-mobile #text-";
  
  var $MOBILE_previousId = 1;
  var $MOBILE_newId = 0;
  
  const $MOBILE_line = ".section-wrap-mobile #line-";
  
  
  //SELECTORS & VARIABLES FOR DESKTOP SECTION:
  // $(".section-wrap-desktop #text-1").show(500);
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
      
      console.log("Mobile");
      
      //SHOW ONLY MOBILE SECTION
      $(".section-wrap-desktop").hide(10);
      $(".section-wrap-mobile").show(10);
      
      // document.querySelector(".section-wrap-desktop").style.display="none";
      // document.querySelector(".section-wrap-mobile").sytle.display="block";
      
      //WHEN CLICK IN AN ITEM, SLIDE UP THE PREVIOUS ONE AND SLIDE DOWN THE NEW ONE:
      $(".section-wrap-mobile button").click(function () {
        $MOBILE_newId = +document.getElementById(this.id).value;
        if ($MOBILE_newId != $MOBILE_previousId){
          //Show the text
          // allPanels.slideUp();
          $(MOBILE_previousPanel + $MOBILE_previousId + "").slideUp();
          $(this).parent().next().slideDown();
          
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
//           allLines.css('opacity', '0');
//           var secondLine = $MOBILE_newId+1;
          
//           $($MOBILE_line + $MOBILE_newId).css('opacity', '1');
//           $($MOBILE_line + secondLine).css('opacity', '1');
        }
        
        $MOBILE_previousId = $MOBILE_newId;
        return false;
      });
    }
    
    
    //IF MEDIA IS DESKTOP:
    else {
      
      //SHOW ONLY DESKTOP SECTION:
      $(".section-wrap-mobile").hide(10);
      $(".section-wrap-desktop").show(10);
      
      //ANIMATION: When click on item, fade away the previous one and highlight the new one:
      $(".section-wrap-desktop button").click(function() {
        
      // console.log("\n"+" Test previousId 1: "+$DESK_previousId);//DEBUG
        
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
          
        console.log("Test previousId end: "+$DESK_previousId);//DEBUG
        }
      });
    }
  }
  
});
