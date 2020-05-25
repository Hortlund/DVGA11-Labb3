"use strict";

var food = [];
var kvitto = [];
$(document).ready(function(){
    
    for(var i = 1; i <= 15; i++){
        $("#bord").append('<button class="dropdown-item">Bord '+ i +' </button>');
    }

    $(".dropdown").hide();
    $(".navbar").hide();
    $(".menu").hide();
    $("#pizza-menu").hide();
    $("#misc-menu").hide();
    $("#drink-menu").hide();
    $("#back").hide();
    $("#note").val("");
    $("#kvitto").attr("disabled", true);
    $("#order").on("click", function(){
        //order = 1;
        $(this).fadeOut(500,function(){
            /*var $input = $('');
            $input.appendTo($("#yo"));*/
            $(".dropdown").show();
            $(".menu").show();
            $(".navbar").show();
            
            
        });
        
    });

    $("#pizza").on("click",function(){
        if($("#drink-menu").is(":visible")){
            $("#drink-menu").toggle("show");
            $("#dryck").toggleClass("active");
        }else if($("#misc-menu").is(":visible")){
            $("#misc-menu").toggle("show");
            $("#misc").toggleClass("active");
        }
        $("#pizza-menu").toggle("show");
        $("#pizza").toggleClass("active");
    });
    $("#dryck").on("click",function(){
        if($("#pizza-menu").is(":visible")){
            $("#pizza-menu").toggle("show");
            $("#pizza").toggleClass("active");
        }else if($("#misc-menu").is(":visible")){
            $("#misc-menu").toggle("show");
            $("#misc").toggleClass("active");
        }
        $("#drink-menu").toggle("show");
        $("#dryck").toggleClass("active");
    });

    $("#misc").on("click",function(){
        if($("#pizza-menu").is(":visible")){
            $("#pizza-menu").toggle("show");
            $("#pizza").toggleClass("active");
        }else if($("#drink-menu").is(":visible")){
            $("#drink-menu").toggle("show");
            $("#dryck").toggleClass("active");
        }
        $("#misc-menu").toggle("show");
        $("#misc").toggleClass("active");
    });
    
    
    $(".dropdown-item").on("click",function(e){
        $("#dropdownMenuButton").text(($(e.target).text()));
    });

    $("#back").on("click", function(){
        window.scrollTo(0,0);
    });

    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 700) {
          $("#back").fadeIn();
        } else {
          $("#back").fadeOut();
        }
      });
    
    $(".list-group-item").on("click", function(e){
        e.stopPropagation();
        //e.preventDefault();
        //
        $(".alert-success").text("1 " + ($(this).children("h5").text() + " lades till."));
        $(".alert-success").fadeIn(500).delay(1000).fadeOut(500);
        food.push({
            "mat" : $(this).children("h5").text(),
            "price" : $(this).children("h5").attr("data-price")
        })
        //console.log(food);
        orderNumber();
    })

    function orderNumber(){
        $("#order-cart span").text(food.length);
        if( food.length == 0){
           // console.log(typeof($("#order-cart span").text()))
            $("#order-cart span").empty();
        }
    }

    function updateModal(){
        var totalPrice = 0;
        $(".modal-orders").html("");
        food.forEach(element => {
            //' - ' + Object.values(element)[1] + 'kr' + 
            $(".modal-orders").append('<li class="btn-group"><button type="button" class="list-group-item list-group-item-action mb-2 food">' + Object.values(element)[0] + '</button><button type="button" class="btn btn-danger remove mb-2">Ta bort</button></li>');
            totalPrice += Number(Object.values(element)[1]);
            //console.log(Object.values(element)[0])
            
        })
        $(".remove").on("click", function(e){
            //const index = food.findIndex(element => Object.values(element)[0] == $(this).siblings(".food").text());
            //const index = food.find(food.keys == $(this).siblings(".food").text())
            //var index = food.indexOf(food.keys[0] === $(this).siblings(".food").text() );
            //var obj = $.grep(food, function(obj){return obj.mat === $(this).siblings(".food").text() ;})[0];
            let obj = food.findIndex(obj => obj.mat == $(this).siblings(".food").text());
            console.log(obj);
            console.log();
            //delete food[$(this).siblings(".food").text()];
            //console.log($(this).siblings(".food").text());
            food.splice(obj, 1)
            updateModal();
            orderNumber();
        })
        $(".modal-orders").append('<h4 class="mt-2">Total pris: ' + totalPrice + 'kr</h4>')
    }

    $("#order-cart").on("click",function(){
        $("#exampleModal").modal("toggle");
        updateModal();
        
    })

    $("#makeOrder").on("click",function(){
        $("#exampleModal").modal("toggle");
        if($("#dropdownMenuButton").text() === "Bord"){
            $(".alert-danger").text("Måste välja bord!");
            $("#dropdownMenuButton").focus();
            $(".alert-danger").fadeIn(500).delay(1000).fadeOut(500);
        }else if(food.length == 0){
            $(".alert-danger").text("Inget att beställa");
            $(".alert-danger").fadeIn(500).delay(1000).fadeOut(500);
        }
        else{
            //$("#yo").hide();
            $(".list-group-item").attr("disabled", true);
            $(".dropdown-item").attr("disabled", true);
            $("#order-cart").attr("disabled", true);
            //$(".kvittoModal-body").html("");
            $(".alert-success").text("Beställning lagd!");
            $(".alert-success").fadeIn(500).delay(1000).fadeOut(500);
            $("#order-cart span").empty();
            $(".modal-orders").html("");
            //$("#dropdownMenuButton").text("Bord");
            $("#kvitto").removeAttr("disabled")
            $("#kvitto span").text("New!");
            $("#kvitto").on("click",function(){
                var totalPricee = 0;
                $(".kvittoModal-orders").html("");
                kvitto = food;
                $("#kvittoModal").modal("toggle");
                
                kvitto.forEach(element => {
                    //' - ' + Object.values(element)[1] + 'kr' + 
                    $(".kvittoModal-orders").append('<li class="btn-group"><button type="button" class="list-group-item list-group-item-action mb-2 food">' + Object.values(element)[0] + ' - ' + Object.values(element)[1] + 'kr' +'</button></li>');
                    totalPricee += Number(Object.values(element)[1]);
                    //console.log(Object.values(element)[0])
                    
                })
                $(".kvittoModal-orders").append('<h6 class="mt-2">Bord: ' + $("#dropdownMenuButton").text() + '</h6>');
                $(".kvittoModal-orders").append('<h6 class="mt-2">Notering: ' + $("#note").val() + '</h6>');
                $(".kvittoModal-orders").append('<h4 class="mt-2">Total pris: ' + totalPricee + 'kr</h4>');

                $("#pay").on("click", function(){
                    location.reload();
                })
            })
            
        }
       console.log(kvitto);
    })
});

